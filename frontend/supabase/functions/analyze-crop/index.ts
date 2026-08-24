const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
      const { imageBase64, cropType, language, symptoms, severity, weather } = await req.json();

      const languageNames: Record<string, string> = {
        en: "English",
        kn: "Kannada",
        hi: "Hindi",
        te: "Telugu",
        ta: "Tamil",
        es: "Spanish",
        fr: "French"
      };
      const targetLanguage = languageNames[language as string] || "English";

      const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
      if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

      const systemPrompt = `You are an expert agricultural plant pathologist. Analyze crop photos or described symptoms for diseases, pests, and nutrient deficiencies. Always return practical, farmer-friendly recommendations including pesticide/fungicide names, organic alternatives, dosage guidance, and prevention tips. 

IMPORTANT: Prioritize organic and eco-friendly alternatives whenever possible. If an organic solution exists, list it clearly. Be concise and actionable.

LANGUAGE REQUIREMENT:
- You MUST respond strictly in ${targetLanguage}.
- EVERYTHING in the JSON response MUST be in ${targetLanguage}.
- This includes the 'crop' name, the 'disease' name, every item in the 'symptoms' array, 'pesticide' names, 'dosage' instructions, 'application' steps, 'safety' notes, 'organic_alternatives', and 'prevention' tips.
- DO NOT use English for any field. If a chemical name is common, transliterate it into ${targetLanguage} script if possible, or provide the translation.
- Ensure the tone is appropriate for a farmer speaking ${targetLanguage}.`;

      let messages;
      if (imageBase64) {
        const userText = `Analyze this ${cropType || "crop"} photo. Identify the crop (if not specified), detect any disease/pest/deficiency, and recommend treatment in ${targetLanguage}. Use the provided tool to return structured results entirely in ${targetLanguage}.`;
        messages = [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: userText },
              { type: "image_url", image_url: { url: imageBase64 } },
            ],
          },
        ];
      } else {
        const symptomsText = symptoms && Array.isArray(symptoms) ? symptoms.join(", ") : "Not specified";
        const userText = `Identify the crop ${cropType || "crop"}, detect any disease/pest/deficiency based solely on these symptoms: ${symptomsText} (estimated severity: ${severity || "moderate"}, recent weather: ${weather || "mixed"}). Since NO photo was provided, diagnose strictly based on these symptoms and environmental conditions. Recommend treatment in ${targetLanguage}. Use the provided tool to return structured results entirely in ${targetLanguage}.`;
        messages = [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: userText,
          },
        ];
      }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        tools: [
          {
            type: "function",
            function: {
              name: "report_diagnosis",
              description: "Return a structured crop disease diagnosis",
              parameters: {
                type: "object",
                properties: {
                  crop: { type: "string", description: "Identified crop name" },
                  healthy: { type: "boolean", description: "True if plant appears healthy" },
                  disease: { type: "string", description: "Disease/pest name, or 'None' if healthy" },
                  severity: { type: "string", enum: ["none", "mild", "moderate", "severe"] },
                  confidence: { type: "number", description: "0-100 confidence score" },
                  symptoms: { type: "array", items: { type: "string" } },
                  causes: { type: "array", items: { type: "string" } },
                  pesticides: {
                    type: "array",
                    description: "Recommended chemical pesticides/fungicides",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        dosage: { type: "string", description: "e.g., 2g per litre of water" },
                        application: { type: "string", description: "How to apply: foliar spray, soil drench, frequency, timing" },
                        safety: { type: "string", description: "Pre-harvest interval, PPE, safety notes" },
                      },
                      required: ["name", "dosage", "application"],
                    },
                  },
                  organic_alternatives: { type: "array", items: { type: "string" }, description: "List of organic or eco-friendly treatment options" },
                  prevention: { type: "array", items: { type: "string" } },
                },
                required: ["crop", "healthy", "disease", "severity", "confidence", "symptoms", "pesticides", "organic_alternatives", "prevention"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "report_diagnosis" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("Gateway error", response.status, t);
      return new Response(JSON.stringify({ error: "AI analysis failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(JSON.stringify({ error: "No diagnosis returned" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const diagnosis = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ diagnosis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-crop error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});