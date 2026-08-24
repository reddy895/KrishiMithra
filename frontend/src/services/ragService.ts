import { RagDocument } from "@/types/nexus";
import { RAG_DOCUMENTS } from "@/data/nexusData";

export interface RagSearchResult {
  chunkId: string;
  topic: string;
  content: string;
  relevanceScore: number;
  documentTitle: string;
  publication: string;
  organization: string;
  country: string;
  crop: string;
  domain: string;
  doiOrUrl: string;
}

export class RagService {
  private static documents: RagDocument[] = RAG_DOCUMENTS;

  /**
   * Search knowledge base with semantic keyword hybridization and metadata filtering
   */
  static search(
    query: string,
    filters?: {
      country?: string;
      crop?: string;
      domain?: string;
    }
  ): RagSearchResult[] {
    const qLower = query.toLowerCase().trim();
    const queryTerms = qLower.split(/\s+/).filter((w) => w.length > 2);

    const results: RagSearchResult[] = [];

    for (const doc of this.documents) {
      if (filters?.country && filters.country !== "All" && doc.country !== filters.country) continue;
      if (filters?.crop && filters.crop !== "All" && !doc.crop.toLowerCase().includes(filters.crop.toLowerCase())) continue;
      if (filters?.domain && filters.domain !== "All" && doc.agriculturalDomain !== filters.domain) continue;

      for (const chunk of doc.keyChunks) {
        const textToSearch = `${doc.title} ${doc.summary} ${chunk.topic} ${chunk.content} ${doc.crop}`.toLowerCase();

        let matchScore = 0;
        let matchedTerms = 0;

        for (const term of queryTerms) {
          if (textToSearch.includes(term)) {
            matchedTerms++;
            // Boost if in title or topic
            if (doc.title.toLowerCase().includes(term) || chunk.topic.toLowerCase().includes(term)) {
              matchScore += 0.25;
            } else {
              matchScore += 0.15;
            }
          }
        }

        if (matchedTerms > 0 || queryTerms.length === 0) {
          const normalizedRelevance = queryTerms.length > 0
            ? Math.min(0.99, Math.max(0.65, parseFloat(((matchedTerms / queryTerms.length) * 0.5 + matchScore + chunk.relevanceScore * 0.4).toFixed(3))))
            : chunk.relevanceScore;

          results.push({
            chunkId: chunk.chunkId,
            topic: chunk.topic,
            content: chunk.content,
            relevanceScore: normalizedRelevance,
            documentTitle: doc.title,
            publication: doc.publication,
            organization: doc.organization,
            country: doc.country,
            crop: doc.crop,
            domain: doc.agriculturalDomain,
            doiOrUrl: doc.doiOrUrl
          });
        }
      }
    }

    // Sort by relevance descending
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  /**
   * Retrieve all indexed research documents
   */
  static getAllDocuments(): RagDocument[] {
    return this.documents;
  }
}
