import React, { useState } from "react";
import { RAG_DOCUMENTS } from "@/data/nexusData";
import { RagDocument } from "@/types/nexus";
import { RagService, RagSearchResult } from "@/services/ragService";
import { 
  BookOpen, Search, Filter, ExternalLink, Bookmark, 
  Sparkles, CheckCircle2, FileText, Globe, Layers, Quote
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { DataHonestyBadge } from "./DataHonestyBadge";

export const RagKnowledgeCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [activeDoc, setActiveDoc] = useState<RagDocument>(RAG_DOCUMENTS[0]);

  const searchResults: RagSearchResult[] = RagService.search(searchQuery, {
    country: selectedCountry,
    crop: selectedCrop,
    domain: selectedDomain
  });

  const domains = [
    "All",
    "Plant Pathology",
    "Soil Science & Regenerative",
    "Climate Adaptation",
    "Water Management"
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Agricultural RAG Knowledge Center
              </h2>
              <DataHonestyBadge sourceType="public_dataset" sourceName="ICAR • EMBRAPA • CAAS • ARC • FAO Research Repositories" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Vectorized & chunked agricultural research papers, extension bulletins, and clinical management protocols
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            {RAG_DOCUMENTS.length} Peer-Reviewed Documents Indexed
          </Badge>
        </div>
      </div>

      {/* Search & Metadata Filter Controls */}
      <Card className="border-border/50 shadow-sm p-4 space-y-3 bg-muted/15">
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search peer-reviewed agricultural knowledge chunks (e.g. blast conidia threshold, AWD water depth, biochar)..."
              className="pl-9 h-11 rounded-xl text-sm bg-background border-border/50"
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-semibold text-muted-foreground">Domain:</span>
            <div className="flex flex-wrap gap-1">
              {domains.map((dom) => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer text-[11px] ${
                    selectedDomain === dom
                      ? "bg-primary text-primary-foreground font-bold"
                      : "bg-card border border-border/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Grid: Retrieved Chunks & Document Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 Cols): Search Results Chunks */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">
              Retrieved Semantic Knowledge Chunks ({searchResults.length}):
            </span>
          </div>

          {searchResults.map((res) => (
            <div
              key={res.chunkId}
              className="p-4 rounded-2xl bg-card border border-border/40 hover:border-primary/40 transition-all space-y-2.5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-[10px] text-primary">{res.chunkId}</Badge>
                  <span className="text-xs font-bold text-foreground">{res.topic}</span>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                  Relevance: {(res.relevanceScore * 100).toFixed(0)}%
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed pl-1 border-l-2 border-primary/40 italic">
                "{res.content}"
              </p>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/20 gap-2">
                <span className="font-semibold text-foreground truncate max-w-[280px]">
                  {res.organization} • {res.documentTitle}
                </span>
                <a
                  href={res.doiOrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline font-mono text-[10px]"
                >
                  <span>DOI/URL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column (5 Cols): Complete Indexed Research Publications */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-foreground">Indexed Primary Literature:</span>

          <div className="space-y-3">
            {RAG_DOCUMENTS.map((doc) => {
              const isSelected = activeDoc.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setActiveDoc(doc)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? "bg-card border-primary shadow-sm ring-1 ring-primary/30"
                      : "bg-card border-border/40 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] font-bold">{doc.country}</Badge>
                    <span className="text-[10px] text-muted-foreground font-mono">{doc.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-foreground line-clamp-2 leading-snug">{doc.title}</h4>
                  <p className="text-[11px] text-muted-foreground">{doc.organization} • {doc.publication}</p>
                </div>
              );
            })}
          </div>

          {/* Active Document Viewer */}
          <Card className="border-border/50 shadow-sm bg-muted/15">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold flex items-center gap-1.5 text-foreground">
                <FileText className="w-3.5 h-3.5 text-primary" />
                Document Metadata & Abstract
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <p className="text-muted-foreground leading-relaxed">{activeDoc.summary}</p>
              <div className="pt-2 border-t border-border/20 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Language: {activeDoc.language}</span>
                <span className="text-primary font-mono">{activeDoc.agriculturalDomain}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
