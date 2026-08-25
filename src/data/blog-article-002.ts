// Article content for Article #002: Meilisearch vs Vector Search
// Faithfully extracted from docs/blog/articles/002_Meilisearch_vs_Vector_Search_EN.md
// and docs/blog/articles/002_Meilisearch_vs_Vector_Search_ID.md
// Only editorial metadata (sections 01-06) and editorial notes (sections 08-16) removed.
// ASCII diagrams converted to Mermaid where appropriate.
// Citation markers (citeturn...) stripped.

export const ARTICLE_002_EN = `
# Meilisearch vs Vector Search: Which Should You Use?

When a team starts building an AI-powered knowledge system, one architecture question appears quickly:

> **Should we use a traditional search engine or vector search?**

The question sounds straightforward, but the comparison is slightly misleading.

Meilisearch and vector search are not necessarily competing categories.

Meilisearch is a search engine that provides full-text search and also supports vector and hybrid retrieval capabilities. Vector search is a retrieval technique based on semantic similarity. Modern search systems can combine both approaches.

So the more useful question is:

> **What kind of retrieval does your application actually need?**

If users frequently search for exact names, codes, product identifiers, policy numbers, or technical terms, keyword matching can be extremely valuable.

If users describe what they want using different words from those used in the source content, semantic retrieval can become much more useful.

And if the application needs both, hybrid search may be the better architecture.

---

## The Wrong Question to Start With

A common architecture discussion starts like this:

> "Should we use vector search because this is an AI project?"

That is backwards.

Start with the users.

Ask:

\`\`\`mermaid
flowchart TD
    A["What do users search for?"] --> B["How do they phrase queries?"]
    B --> C["What makes a result relevant?"]
    C --> D["How precise must the result be?"]
    D --> E["What filters and permissions apply?"]
    E --> F["Select retrieval architecture"]
\`\`\`

Only then should the retrieval architecture be selected.

This matters because search is not just a technology choice.

It is part of the product experience.

---

## How Keyword Search Works

Keyword search retrieves documents based primarily on the terms contained in the query and indexed content.

Imagine a knowledge base containing:

- Customer Eligibility Policy
- Corporate Account Procedure
- Individual Customer Procedure
- Customer Verification Guide

A user searches:

\`\`\`
customer verification
\`\`\`

A keyword-oriented search system can directly identify documents containing those terms.

This is particularly useful when the exact vocabulary matters.

Examples include:

- product codes
- policy numbers
- names
- technical terms
- legal references
- error codes
- SKUs
- abbreviations

Keyword search has another important property:

> **It is easy for users to understand why a result matched.**

If the user searches for:

\`\`\`
ERR-402
\`\`\`

they generally expect documents containing \`ERR-402\` to be highly relevant.

Semantic similarity is not necessarily better for that type of query.

---

## How Vector Search Works

Vector search approaches retrieval differently.

Instead of primarily asking:

> "Does this document contain these words?"

the system represents content and queries as vectors and searches for items that are close in the resulting vector space.

Conceptually:

\`\`\`mermaid
flowchart TD
    subgraph Indexing
        A[Document] --> B[Embedding] --> C[Vector]
    end
    subgraph Querying
        D[Query] --> E[Embedding] --> F[Vector]
    end
    F --> G[Similarity Search]
    C --> G
    G --> H[Relevant Results]
\`\`\`

This allows a search to find conceptually related content even when the wording differs.

For example, a user might search:

\`\`\`
How do I become eligible for a corporate account?
\`\`\`

while the source document might use:

\`\`\`
Corporate customer qualification requirements
\`\`\`

The words are different.

The meaning is related.

That is where semantic retrieval can be useful.

---

## Where Keyword Search Wins

Keyword search is still highly relevant.

It is often the better choice when the query contains information that should be matched precisely.

### 1. Exact Identifiers

Examples:

\`\`\`
INV-2026-00481
ERR-402
SKU-AX91
POLICY-17
\`\`\`

Exact matching matters more than semantic similarity.

### 2. Names and Proper Nouns

Examples: MARS Outbound, CRM, QMS, Laravel, Meilisearch.

If the user explicitly knows the name, returning semantically similar concepts is not necessarily helpful.

### 3. Technical Terms

Technical documentation often contains vocabulary that should remain precise.

For example: OAuth, SAML, SMTP, DNS, Laravel, PostgreSQL.

A semantic search engine can understand relationships between concepts, but the exact term may still be the strongest retrieval signal.

### 4. Filtering and Structured Retrieval

Business search often involves more than relevance.

Users may need:

\`\`\`
Project = A
Category = Policy
Status = Published
Date > 2026-01-01
\`\`\`

This means the retrieval system must work with structured metadata and filtering as part of the overall experience.

---

## Where Vector Search Wins

Vector search becomes attractive when the user does not know the exact vocabulary used by the source documents.

### 1. Natural-Language Queries

Consider:

\`\`\`
How can I check whether a new customer is eligible?
\`\`\`

The source might say:

\`\`\`
Customer qualification criteria
\`\`\`

A semantic retrieval system can bridge the vocabulary difference.

### 2. Conceptual Discovery

Users sometimes know the problem but not the terminology.

For example:

\`\`\`
How do we handle customers who don't have all the required documents?
\`\`\`

The knowledge base may contain a section called:

\`\`\`
Incomplete Documentation Procedure
\`\`\`

A keyword search may have less overlap.

Semantic retrieval can potentially identify the conceptual relationship.

### 3. Knowledge Discovery

Vector search is useful when users are exploring a topic rather than looking for a known item.

This is particularly relevant for knowledge systems where users may ask questions in natural language.

---

## What Hybrid Search Changes

The choice does not have to be:

\`\`\`
Keyword OR Vector
\`\`\`

It can be:

\`\`\`
Keyword + Vector = Hybrid
\`\`\`

Hybrid search combines lexical matching with semantic retrieval. Meilisearch currently describes hybrid search as combining keyword precision with semantic understanding and provides controls for balancing the two approaches.

Conceptually:

\`\`\`mermaid
flowchart TD
    A[Query] --> B[Keyword Search]
    A --> C[Vector Search]
    B --> D[Ranked Results]
    C --> D
\`\`\`

This can be useful because real search behavior is mixed.

One user might search:

\`\`\`
QMS
\`\`\`

while another might ask:

\`\`\`
What procedure explains quality management requirements?
\`\`\`

The first query benefits heavily from lexical precision.

The second benefits more from semantic understanding.

A hybrid system can support both patterns.

---

## Meilisearch Is Not the Opposite of Vector Search

This distinction is important.

The comparison "Meilisearch vs Vector Search" can imply that one replaces the other.

That is not necessarily true.

Meilisearch supports full-text search and also provides vector and hybrid search capabilities.

So the more accurate comparison is:

\`\`\`mermaid
flowchart LR
    A[Full-Text Retrieval] --- D[Choose based on requirements]
    B[Vector Retrieval] --- D
    C[Hybrid Retrieval] --- D
\`\`\`

with Meilisearch being one possible platform for implementing these retrieval patterns.

This is a much more useful architectural discussion.

---

## A Practical Decision Framework

Instead of choosing based on trends, use a decision matrix.

| Requirement | Keyword | Vector | Hybrid |
|---|---|---|---|
| Exact identifiers | Excellent | Weak | Excellent |
| Exact terminology | Excellent | Variable | Excellent |
| Typo tolerance | Strong | Not the primary purpose | Strong |
| Meaning-based retrieval | Limited | Strong | Strong |
| Natural-language queries | Variable | Strong | Strong |
| Known-item search | Excellent | Variable | Excellent |
| Discovery | Limited | Strong | Strong |
| Structured filters | Strong | Depends on architecture | Strong |
| Implementation simplicity | Strong | More components | Moderate |
| Need for semantic model | No | Yes | Yes |
| Need for lexical precision | Yes | Not necessarily | Yes |

The table is intentionally directional rather than absolute.

The quality of each approach depends on the implementation, data, ranking strategy, and query patterns.

---

## A Better Architecture Question

Rather than asking:

> "Which search technology is best?"

ask:

> **"Which retrieval signals matter for our users?"**

For example:

### Scenario A: Internal Documentation

Users search:

\`\`\`
SMTP configuration
SSO setup
DNS configuration
\`\`\`

Keyword search may already solve a large part of the problem.

### Scenario B: Large Knowledge Base

Users ask:

\`\`\`
What should an employee do when a customer cannot provide the required documents?
\`\`\`

Semantic retrieval becomes more attractive.

### Scenario C: Enterprise Knowledge System

Users search both:

\`\`\`
QMS
\`\`\`

and:

\`\`\`
What process handles quality management requirements?
\`\`\`

Hybrid retrieval becomes a strong candidate.

---

## Search Architecture Is Also an Information Architecture Problem

There is another lesson that often gets missed.

Search quality does not begin at the search engine.

It begins with the data.

If the knowledge system contains:

- Title
- Category
- Content
- Project
- Status
- Metadata

then the retrieval system has more meaningful signals to work with.

This connects directly to the previous article:

> **How to Turn Complex PDFs into Structured Knowledge**

The pipeline was:

\`\`\`mermaid
flowchart TD
    A[PDF] --> B[Understand]
    B --> C[Structure]
    C --> D[Review]
    D --> E[Publish]
    E --> F[Search]
\`\`\`

The quality of the search layer depends partly on what happens before the search query is executed.

Better structured knowledge creates better retrieval opportunities.

---

## A Real-World Example

In an enterprise knowledge management system we built, the platform used Laravel with Meilisearch as its search layer.

The system was designed around multiple projects, with each project having its own users and knowledge context.

Conceptually:

\`\`\`mermaid
flowchart TD
    A[Organization] --> B[Project A]
    A --> C[Project B]
    B --> D[Users]
    B --> E[Knowledge]
    C --> F[Users]
    C --> G[Knowledge]
\`\`\`

The platform also included an AI-assisted document workflow:

\`\`\`mermaid
flowchart TD
    A[PDF] --> B[Read]
    B --> C[Understand Structure]
    C --> D["Generate Title / Category / Content"]
    D --> E[Admin Review]
    E --> F[Publish]
\`\`\`

The important engineering lesson here is not that one particular search technology is universally correct.

It is that retrieval has to fit the knowledge model and the user workflow.

The project used Meilisearch as the search layer because search was one component of a larger application architecture.

That is the kind of decision that should be made from system requirements rather than from the label "AI."

---

## Common Architecture Mistakes

### 1. Adding Vector Search Because the Product Uses AI

An AI feature does not automatically require vector search.

Ask what users actually need to retrieve.

### 2. Assuming Semantic Search Is Always Better

Semantic relevance can be extremely useful.

But if a user searches for:

\`\`\`
ERR-402
\`\`\`

finding a conceptually related error is not necessarily better than finding the exact identifier.

### 3. Ignoring Exact-Match Signals

Names, identifiers, codes, technical terms, and policy references can carry strong lexical signals.

Do not throw those signals away simply because semantic search is available.

### 4. Evaluating Search Without Real Queries

A search architecture should be tested against realistic user queries.

Create a small evaluation set:

- Known-item queries
- Exact-term queries
- Natural-language queries
- Ambiguous queries
- Misspelled queries
- Filter-heavy queries

Then compare retrieval quality.

### 5. Choosing the Database Before Defining Retrieval

Search is not just a storage decision.

First define: **What is a relevant result?**

Then design the retrieval architecture around that definition.

### 6. Ignoring Permissions

Enterprise knowledge systems often have multiple projects, users, and content boundaries.

A search result is only useful if the user is actually allowed to access the underlying knowledge.

Retrieval and authorization therefore need to be designed together.

---

## What We Would Recommend

For a new knowledge system, do not start with vector search by default.

Start with a query taxonomy.

Collect representative queries and classify them:

- Exact
- Known Item
- Natural Language
- Semantic
- Discovery
- Filtered
- Ambiguous

Then evaluate which retrieval signals each class needs.

A practical progression can be:

\`\`\`mermaid
flowchart TD
    A["Phase 1: Full-Text Search"] --> B[Measure real queries]
    B --> C[Identify semantic gaps]
    C --> D["Phase 2: Add Semantic Retrieval"]
    D --> E[Evaluate Hybrid Search]
    E --> F["Phase 3: Tune Ranking"]
\`\`\`

This approach keeps the architecture driven by evidence.

---

## When I Would Choose Each Approach

### Choose Keyword Search When

- users know the terminology
- exact identifiers matter
- content is highly structured
- queries are relatively predictable
- filters are important
- the system does not need semantic discovery

### Choose Vector Search When

- users frequently describe concepts rather than exact terms
- source and query vocabulary differ substantially
- semantic discovery is important
- natural-language retrieval is a core requirement

### Choose Hybrid Search When

- both exact terms and semantic meaning matter
- users have mixed search behavior
- the knowledge base contains technical identifiers as well as natural-language content
- you need both lexical precision and semantic recall

The third option is increasingly important because real-world search behavior rarely fits into one category.

---

## Conclusion

The question is not:

> **Meilisearch or vector search?**

The better question is:

> **What kind of relevance does your application need?**

Keyword retrieval is great when exact terms matter.

Vector retrieval is useful when meaning matters more than wording.

Hybrid retrieval combines both when users need both signals.

And Meilisearch should not be framed as the opposite of vector search. Modern Meilisearch supports full-text, vector, and hybrid retrieval capabilities, so the architecture decision is really about choosing the right retrieval strategy for the application.

For business knowledge systems, I would start with the users' actual queries, build a small evaluation set, and only add semantic retrieval where it solves a demonstrated problem.

That keeps the architecture simple where simplicity is enough, and introduces AI where it genuinely improves retrieval.
`;
export const ARTICLE_002_ID = `
# Meilisearch vs Vector Search: Mana yang Sebaiknya Digunakan?

Ketika sebuah tim mulai membangun knowledge system yang menggunakan AI, ada satu pertanyaan architecture yang biasanya seringkali muncul:

> **Haruskah kita menggunakan traditional search atau vector search?**

Pertanyaannya terlihat sederhana, tetapi sebenarnya perbandingan tersebut sedikit menyesatkan.

Meilisearch dan vector search tidak serta-merta dua kategori yang saling berlawanan.

Meilisearch adalah search engine yang menyediakan full-text search sekaligus mendukung vector dan hybrid retrieval. Sementara vector search adalah teknik retrieval yang menggunakan semantic similarity. Search system modern dapat menggabungkan keduanya.

Jadi pertanyaan yang lebih berguna adalah:

> **Retrieval seperti apa yang sebenarnya dibutuhkan aplikasi Anda?**

Jika user sering mencari nama, kode, identifier, nomor policy, atau technical term secara exact, keyword matching bisa sangat berguna.

Jika user menjelaskan apa yang mereka cari dengan kata-kata yang berbeda dari content sumber, semantic retrieval bisa menjadi jauh lebih berguna.

Dan jika aplikasi membutuhkan keduanya, hybrid search dapat menjadi architecture yang lebih tepat.

---

## Pertanyaan yang Salah untuk Memulai

Diskusi architecture sering dimulai seperti ini:

> "Haruskah kita menggunakan vector search karena ini project AI?"

Itu justru terbalik. Mulailah dari user.

Tanyakan:

\`\`\`mermaid
flowchart TD
    A["Apa yang sebenarnya dicari user?"] --> B["Bagaimana mereka menulis query?"]
    B --> C["Apa yang membuat sebuah result dianggap relevan?"]
    C --> D["Seberapa presisi hasil tersebut harus?"]
    D --> E["Filter dan permission apa yang berlaku?"]
    E --> F["Pilih retrieval architecture"]
\`\`\`

Baru setelah itu retrieval architecture dipilih.

Ini penting karena search bukan hanya technology choice.

Search adalah bagian dari product experience.

---

## Bagaimana Keyword Search Bekerja?

Keyword search mengambil dokumen berdasarkan istilah yang terdapat di dalam query dan content yang sudah di-index.

Bayangkan sebuah knowledge base berisi:

- Customer Eligibility Policy
- Corporate Account Procedure
- Individual Customer Procedure
- Customer Verification Guide

User mencari:

\`\`\`
customer verification
\`\`\`

Search berbasis keyword dapat langsung mengidentifikasi dokumen yang mengandung istilah tersebut.

Ini sangat berguna ketika vocabulary yang digunakan memang harus presisi.

Contohnya:

- product code
- policy number
- nama
- technical term
- legal reference
- error code
- SKU
- abbreviation

Keyword search juga memiliki satu property yang penting:

> **User lebih mudah memahami mengapa sebuah result dianggap cocok.**

Jika user mencari:

\`\`\`
ERR-402
\`\`\`

mereka umumnya mengharapkan dokumen yang mengandung \`ERR-402\` muncul sebagai result yang sangat relevan.

Semantic similarity belum tentu lebih baik untuk query seperti ini.

---

## Bagaimana Vector Search Bekerja?

Vector search menggunakan pendekatan yang berbeda.

Alih-alih bertanya:

> "Apakah dokumen ini mengandung kata-kata tersebut?"

system merepresentasikan content dan query sebagai vector, lalu mencari item yang berada dekat satu sama lain dalam vector space.

Secara konseptual:

\`\`\`mermaid
flowchart TD
    subgraph Indexing
        A[Document] --> B[Embedding] --> C[Vector]
    end
    subgraph Querying
        D[Query] --> E[Embedding] --> F[Vector]
    end
    F --> G[Similarity Search]
    C --> G
    G --> H[Relevant Results]
\`\`\`

Pendekatan ini memungkinkan system menemukan content yang secara konsep berkaitan meskipun wording-nya berbeda.

Misalnya user mencari:

\`\`\`
Bagaimana cara mengetahui apakah customer baru memenuhi syarat untuk corporate account?
\`\`\`

Sementara source document menggunakan istilah:

\`\`\`
Corporate customer qualification requirements
\`\`\`

Kata-katanya berbeda.

Maknanya berhubungan.

Di situlah semantic retrieval menjadi berguna.

---

## Kapan Keyword Search Lebih Unggul?

Keyword search masih sangat relevan.

Bahkan untuk banyak system, keyword search justru merupakan starting point yang lebih masuk akal.

### 1. Exact Identifier

Contoh:

\`\`\`
INV-2026-00481
ERR-402
SKU-AX91
POLICY-17
\`\`\`

Exact matching lebih penting daripada semantic similarity.

### 2. Nama dan Proper Noun

Contoh: MARS Outbound, CRM, QMS, Laravel, Meilisearch.

Jika user sudah mengetahui nama yang dicari, mengembalikan konsep yang mirip belum tentu membantu.

### 3. Technical Terms

Technical documentation biasanya memiliki vocabulary yang harus tetap presisi.

Contohnya: OAuth, SAML, SMTP, DNS, Laravel, PostgreSQL.

Semantic search dapat memahami hubungan antar konsep, tetapi exact term tetap bisa menjadi signal retrieval yang sangat kuat.

### 4. Filtering dan Structured Retrieval

Business search sering kali tidak hanya membutuhkan relevance.

User dapat membutuhkan:

\`\`\`
Project = A
Category = Policy
Status = Published
Date > 2026-01-01
\`\`\`

Artinya retrieval system harus dapat bekerja dengan structured metadata dan filtering sebagai bagian dari keseluruhan experience.

---

## Kapan Vector Search Lebih Unggul?

Vector search menjadi menarik ketika user tidak mengetahui vocabulary yang digunakan oleh source document.

### 1. Natural-Language Query

Misalnya:

\`\`\`
Bagaimana cara mengecek apakah customer baru memenuhi syarat?
\`\`\`

Source mungkin menggunakan:

\`\`\`
Customer qualification criteria
\`\`\`

Semantic retrieval dapat membantu menjembatani perbedaan vocabulary tersebut.

### 2. Conceptual Discovery

User terkadang mengetahui masalahnya, tetapi tidak mengetahui terminology yang digunakan oleh knowledge base.

Misalnya:

\`\`\`
Bagaimana menangani customer yang tidak memiliki semua dokumen yang dibutuhkan?
\`\`\`

Knowledge base mungkin memiliki section bernama:

\`\`\`
Incomplete Documentation Procedure
\`\`\`

Keyword search mungkin memiliki sedikit overlap.

Semantic retrieval berpotensi menemukan hubungan konseptual tersebut.

### 3. Knowledge Discovery

Vector search berguna ketika user sedang mengeksplorasi sebuah topic, bukan mencari known item tertentu.

Ini sangat relevan untuk knowledge system di mana user dapat mengajukan pertanyaan menggunakan natural language.

---

## Apa yang Berubah dengan Hybrid Search?

Pilihan tidak harus:

\`\`\`
Keyword OR Vector
\`\`\`

Bisa juga:

\`\`\`
Keyword + Vector = Hybrid
\`\`\`

Hybrid search menggabungkan lexical matching dengan semantic retrieval. Meilisearch saat ini menjelaskan hybrid search sebagai kombinasi keyword dan semantic search, dengan pengaturan untuk mengatur balance antara keduanya.

Secara konseptual:

\`\`\`mermaid
flowchart TD
    A[Query] --> B[Keyword Search]
    A --> C[Vector Search]
    B --> D[Ranked Results]
    C --> D
\`\`\`

Ini berguna karena real-world search behavior biasanya campuran.

Satu user mungkin mencari:

\`\`\`
QMS
\`\`\`

sementara user lain bertanya:

\`\`\`
Prosedur apa yang menjelaskan quality management requirements?
\`\`\`

Query pertama sangat bergantung pada lexical precision.

Query kedua lebih membutuhkan semantic understanding.

Hybrid search dapat mendukung keduanya.

---

## Meilisearch Bukan Lawan dari Vector Search

Ini adalah distinction yang penting.

Perbandingan "Meilisearch vs Vector Search" dapat membuat seolah-olah salah satunya harus menggantikan yang lain.

Padahal tidak selalu begitu.

Meilisearch mendukung full-text search sekaligus vector dan hybrid search.

Jadi comparison yang lebih akurat adalah:

\`\`\`mermaid
flowchart LR
    A[Full-Text Retrieval] --- D[Pilih berdasarkan kebutuhan]
    B[Vector Retrieval] --- D
    C[Hybrid Retrieval] --- D
\`\`\`

dengan Meilisearch sebagai salah satu platform yang dapat digunakan untuk menerapkan retrieval pattern tersebut.

Ini jauh lebih berguna sebagai diskusi architecture.

---

## Practical Decision Framework

Daripada memilih berdasarkan trend, gunakan decision matrix.

| Requirement | Keyword | Vector | Hybrid |
|---|---|---|---|
| Exact identifiers | Excellent | Weak | Excellent |
| Exact terminology | Excellent | Variable | Excellent |
| Typo tolerance | Strong | Not the primary purpose | Strong |
| Meaning-based retrieval | Limited | Strong | Strong |
| Natural-language queries | Variable | Strong | Strong |
| Known-item search | Excellent | Variable | Excellent |
| Discovery | Limited | Strong | Strong |
| Structured filters | Strong | Depends on architecture | Strong |
| Implementation simplicity | Strong | More components | Moderate |
| Need for semantic model | No | Yes | Yes |
| Need for lexical precision | Yes | Not necessarily | Yes |

Table ini sengaja bersifat directional, bukan absolute.

Kualitas masing-masing approach bergantung pada implementation, data, ranking strategy, dan query pattern.

---

## Pertanyaan Architecture yang Lebih Baik

Daripada bertanya:

> "Search technology mana yang terbaik?"

tanyakan:

> **"Retrieval signal apa yang paling penting bagi user kita?"**

Misalnya:

### Scenario A: Internal Documentation

User mencari:

\`\`\`
SMTP configuration
SSO setup
DNS configuration
\`\`\`

Keyword search mungkin sudah menyelesaikan sebagian besar kebutuhan.

### Scenario B: Large Knowledge Base

User bertanya:

\`\`\`
Apa yang harus dilakukan employee ketika customer tidak dapat menyediakan dokumen yang dibutuhkan?
\`\`\`

Semantic retrieval menjadi lebih menarik.

### Scenario C: Enterprise Knowledge System

User mencari:

\`\`\`
QMS
\`\`\`

dan juga:

\`\`\`
Proses apa yang menangani quality management requirements?
\`\`\`

Hybrid retrieval menjadi kandidat yang kuat.

---

## Search Architecture Juga Merupakan Information Architecture Problem

Ada satu hal lain yang sering terlewat.

Search quality tidak dimulai dari search engine.

Search quality dimulai dari data.

Jika knowledge system memiliki:

- Title
- Category
- Content
- Project
- Status
- Metadata

retrieval system memiliki lebih banyak signal yang dapat digunakan.

Ini terhubung langsung dengan artikel sebelumnya:

> **How to Turn Complex PDFs into Structured Knowledge**

Pipeline-nya:

\`\`\`mermaid
flowchart TD
    A[PDF] --> B[Understand]
    B --> C[Structure]
    C --> D[Review]
    D --> E[Publish]
    E --> F[Search]
\`\`\`

Kualitas search layer sebagian bergantung pada apa yang terjadi sebelum query search dijalankan.

Structured knowledge yang lebih baik menciptakan lebih banyak peluang untuk menghasilkan retrieval yang baik.

---

## Contoh di Dunia Nyata

Dalam sebuah enterprise knowledge management system yang kami bangun, platform menggunakan Laravel dengan Meilisearch sebagai search layer.

System dirancang sebagai multi-project platform, dengan setiap project memiliki user dan knowledge context masing-masing.

Secara konseptual:

\`\`\`mermaid
flowchart TD
    A[Organization] --> B[Project A]
    A --> C[Project B]
    B --> D[Users]
    B --> E[Knowledge]
    C --> F[Users]
    C --> G[Knowledge]
\`\`\`

Platform juga memiliki AI-assisted document workflow:

\`\`\`mermaid
flowchart TD
    A[PDF] --> B[Read]
    B --> C[Understand Structure]
    C --> D["Generate Title / Category / Content"]
    D --> E[Admin Review]
    E --> F[Publish]
\`\`\`

Pelajaran engineering yang penting bukan bahwa satu search technology selalu benar.

Pelajarannya adalah:

> **Retrieval harus sesuai dengan knowledge model dan user workflow.**

Project tersebut menggunakan Meilisearch sebagai search layer karena search merupakan salah satu component dari application architecture yang lebih besar.

Itulah jenis keputusan yang seharusnya dibuat berdasarkan system requirements, bukan sekadar karena produk tersebut diberi label "AI".

---

## Kesalahan Architecture yang Sering Terjadi

### 1. Menambahkan Vector Search Karena Produk Menggunakan AI

AI feature tidak otomatis membutuhkan vector search.

Tanyakan terlebih dahulu apa yang sebenarnya perlu di-retrieve oleh user.

### 2. Menganggap Semantic Search Selalu Lebih Baik

Semantic relevance bisa sangat berguna.

Tetapi jika user mencari:

\`\`\`
ERR-402
\`\`\`

menemukan error yang secara konsep mirip belum tentu lebih baik daripada menemukan identifier yang exact.

### 3. Mengabaikan Exact-Match Signal

Nama, identifier, code, technical term, dan policy reference dapat memiliki lexical signal yang sangat kuat.

Jangan menghilangkan signal tersebut hanya karena semantic search tersedia.

### 4. Mengevaluasi Search Tanpa Real User Query

Search architecture sebaiknya diuji menggunakan query yang realistis.

Buat evaluation set kecil:

- Known-item queries
- Exact-term queries
- Natural-language queries
- Ambiguous queries
- Misspelled queries
- Filter-heavy queries

Kemudian bandingkan retrieval quality.

### 5. Memilih Database Sebelum Mendefinisikan Retrieval

Search bukan sekadar keputusan storage.

Tentukan terlebih dahulu: **Apa yang disebut sebagai relevant result?**

Baru kemudian design retrieval architecture berdasarkan definisi tersebut.

### 6. Mengabaikan Permission

Enterprise knowledge system sering memiliki banyak project, user, dan content boundary.

Sebuah search result hanya berguna jika user memang memiliki akses terhadap knowledge tersebut.

Karena itu retrieval dan authorization perlu dirancang bersama.

---

## Apa yang Kami Rekomendasikan?

Untuk knowledge system baru, kami tidak menyarankan memulai dengan vector search secara default.

Mulailah dengan query taxonomy.

Kumpulkan representative queries lalu kategorikan:

- Exact
- Known Item
- Natural Language
- Semantic
- Discovery
- Filtered
- Ambiguous

Kemudian evaluasi retrieval signal yang dibutuhkan setiap kategori.

Progression yang praktis:

\`\`\`mermaid
flowchart TD
    A["Phase 1: Full-Text Search"] --> B[Ukur real queries]
    B --> C[Identifikasi semantic gaps]
    C --> D["Phase 2: Tambahkan Semantic Retrieval"]
    D --> E[Evaluasi Hybrid Search]
    E --> F["Phase 3: Tune Ranking"]
\`\`\`

Pendekatan ini menjaga agar architecture tetap didorong oleh evidence.

---

## Kapan Saya Memilih Masing-Masing Approach?

### Pilih Keyword Search Ketika

- user mengetahui terminology
- exact identifier penting
- content sangat terstruktur
- query relatif predictable
- filter penting
- system tidak membutuhkan semantic discovery

### Pilih Vector Search Ketika

- user sering mendeskripsikan concept daripada exact term
- vocabulary source dan query sangat berbeda
- semantic discovery penting
- natural-language retrieval merupakan core requirement

### Pilih Hybrid Search Ketika

- exact term dan semantic meaning sama-sama penting
- user memiliki search behavior yang beragam
- knowledge base memiliki technical identifier sekaligus natural-language content
- Anda membutuhkan lexical precision sekaligus semantic recall

Opsi ketiga ini semakin penting karena real-world search behavior jarang hanya masuk ke satu kategori.

---

## Conclusion

Pertanyaannya bukan:

> **Meilisearch atau vector search?**

Pertanyaan yang lebih baik adalah:

> **Relevance seperti apa yang dibutuhkan aplikasi Anda?**

Keyword retrieval sangat baik ketika exact terms penting.

Vector retrieval berguna ketika meaning lebih penting daripada wording.

Hybrid retrieval menggabungkan keduanya ketika user membutuhkan kedua signal tersebut.

Dan Meilisearch tidak seharusnya dianggap sebagai lawan dari vector search. Meilisearch modern mendukung full-text, vector, dan hybrid retrieval, sehingga keputusan architecture sebenarnya adalah memilih retrieval strategy yang paling sesuai untuk aplikasi.

Untuk business knowledge system, saya akan mulai dari real user queries, membuat evaluation set kecil, lalu menambahkan semantic retrieval hanya ketika memang ada masalah yang terbukti tidak dapat diselesaikan dengan retrieval yang lebih sederhana.

Dengan begitu architecture tetap sederhana ketika simplicity sudah cukup, dan AI digunakan ketika memang memberikan improvement yang nyata pada retrieval.
`;
