window.ARIZONA_DATA = {
  meta: {
    updated: "31 août 2026",
    cutoff: "2026-08-31",
    title: "Conclave Arizona",
    canonical: "https://yannkeep.github.io/conclave-arizona/"
  },

  blindspots: [
    {
      id: "defense",
      number: "01",
      domain: "long-terme",
      label: "Défense 2035",
      title: "Le nouveau plancher ne s’arrête plus à 2 %",
      lead: "L’engagement OTAN porte désormais sur 3,5 % du PIB pour la défense de base et jusqu’à 1,5 % pour sécurité et résilience d’ici 2035.",
      risk: "Une trajectoire 2027–2029 peut être formellement équilibrée tout en fabriquant un mur budgétaire après 2029.",
      question: "Quelle trajectoire annuelle conduit de 2 % à 3,5 %, et quelles dépenses sont réellement additionnelles ?",
      action: "Publier un pont de classification et une trajectoire 2027–2035.",
      severity: 5,
      sources: ["S9", "S10"]
    },
    {
      id: "interfederal",
      number: "02",
      domain: "gouvernance",
      label: "Interfédéral",
      title: "Le déficit est consolidé, les compétences sont fragmentées",
      lead: "L’effort européen concerne l’ensemble des administrations publiques, mais aucune répartition crédible n’est stabilisée entre niveaux de pouvoir.",
      risk: "Une économie fédérale peut devenir une dépense régionale, communale ou sociale.",
      question: "Qui porte l’effort, qui compense et qui corrige si un niveau dévie ?",
      action: "Joindre une matrice entité × mesure × compensation.",
      severity: 5,
      sources: ["S5", "S7", "S8"]
    },
    {
      id: "ageing",
      number: "03",
      domain: "social",
      label: "Vieillissement",
      title: "La facture se déplace vers la santé et la dépendance",
      lead: "Les coûts liés à l’âge ne se limitent pas aux pensions. Soins chroniques, dépendance et personnel déplacent le profil de dépense.",
      risk: "Comprimer une enveloppe annuelle peut augmenter les coûts humains et budgétaires futurs.",
      question: "Quel effet à dix ans sur les soins, les aidants et les dépenses de longue durée ?",
      action: "Tester chaque mesure sur la projection santé 2025–2035.",
      severity: 4,
      sources: ["S11", "S18"]
    },
    {
      id: "reviews",
      number: "04",
      domain: "execution",
      label: "Spending reviews",
      title: "Un rapport d’efficience n’est pas encore une économie",
      lead: "Les revues peuvent identifier des options, mais leur rendement dépend d’une décision, d’un texte, d’une mise en œuvre et parfois de jalons européens.",
      risk: "Inscrire la valeur brute d’une option avant arbitrage crée une recette de papier.",
      question: "Quelle option est décidée, par quel texte, à quelle date et avec quel coût de transition ?",
      action: "Associer chaque revue à un propriétaire, un calendrier et une réserve.",
      severity: 4,
      sources: ["S2", "S3"]
    },
    {
      id: "distribution",
      number: "05",
      domain: "social",
      label: "Distribution & genre",
      title: "Les moyennes cachent qui supporte réellement l’effort",
      lead: "Pauvreté, genre, âge, handicap, statut et région modifient fortement l’incidence d’une même mesure.",
      risk: "Une compensation moyenne peut manquer les familles monoparentales ou les personnes à recours élevé aux soins.",
      question: "Quel effet net par décile, type de ménage, genre et région ?",
      action: "Publier un budget distributionnel ex ante et ex post.",
      severity: 5,
      sources: ["S12", "S13", "S14"]
    },
    {
      id: "activation",
      number: "06",
      domain: "social",
      label: "Activation",
      title: "Le potentiel d’emploi n’est ni homogène ni instantané",
      lead: "Compétences, santé mentale, garde d’enfants, mobilité et fiscalité du travail conditionnent le retour à l’emploi.",
      risk: "Une hypothèse comportementale optimiste devient un trou si les personnes basculent vers un autre dispositif.",
      question: "Combien de transitions nettes vers l’emploi durable, et combien de transferts vers CPAS ou invalidité ?",
      action: "Chiffrer volumes, délais, salaires, substitutions et coûts d’accompagnement.",
      severity: 5,
      sources: ["S15", "S16", "S17"]
    },
    {
      id: "refinancing",
      number: "07",
      domain: "fiscal",
      label: "Refinancement",
      title: "Le risque de dette se transmet progressivement",
      lead: "La hausse des taux ne frappe pas tout le stock instantanément. Elle passe par le calendrier d’émissions et la maturité moyenne.",
      risk: "Un choc de financement peut manger les marges budgétaires futures sans apparaître dans le coût initial d’une mesure.",
      question: "Quel besoin annuel de refinancement sous +100 et +200 points de base ?",
      action: "Publier un stress test taux × maturité × croissance.",
      severity: 4,
      sources: ["S19", "S20", "S21"]
    },
    {
      id: "tax-expenditures",
      number: "08",
      domain: "fiscal",
      label: "Dépenses fiscales",
      title: "Une niche doit être évaluée comme une politique publique",
      lead: "Le volume d’une dépense fiscale n’est pas le rendement récupérable de sa suppression.",
      risk: "Le rendement statique ignore substitution, contentieux, transition et interactions entre impôts.",
      question: "Quel objectif, quel bénéficiaire, quelle additionnalité et quel rendement net ?",
      action: "Créer une revue périodique avec clause d’extinction.",
      severity: 4,
      sources: ["S22", "S23"]
    },
    {
      id: "fossil",
      number: "09",
      domain: "fiscal",
      label: "Fiscalité fossile",
      title: "10,8 milliards ne sont pas 10,8 milliards de recettes faciles",
      lead: "L’inventaire recense un stock d’avantages, mais chaque ligne a sa base, ses bénéficiaires et son risque de déplacement.",
      risk: "Une suppression brutale peut être régressive ou déplacer émissions et activité sans transition.",
      question: "Quel séquençage protège les ménages vulnérables et réinvestit dans les alternatives ?",
      action: "Lier inventaire, plan énergie-climat et trajectoire de transition juste.",
      severity: 4,
      sources: ["S24", "S25"]
    },
    {
      id: "capacity",
      number: "10",
      domain: "execution",
      label: "Capacité de l’État",
      title: "Couper l’exécution peut détruire le rendement",
      lead: "Effectifs, IT, achats et contrôle sont parfois traités comme frais compressibles alors qu’ils produisent la mise en œuvre et certaines recettes.",
      risk: "L’économie brute est annulée par les retards, erreurs, fraude non détectée et projets abandonnés.",
      question: "Quelle capacité minimale protège le rendement et l’investissement ?",
      action: "Séparer coût de structure, capacité productive et investissement.",
      severity: 5,
      sources: ["S2", "S4", "S8"]
    },
    {
      id: "contingent",
      number: "11",
      domain: "fiscal",
      label: "Hors Maastricht",
      title: "Les garanties existent avant d’entrer dans le déficit",
      lead: "Garanties, partenariats, entreprises publiques et prêts non performants peuvent créer des appels futurs.",
      risk: "Un budget conforme en flux peut sous-estimer un risque de bilan significatif.",
      question: "Quel inventaire consolidé, quelle probabilité d’appel et quelle provision ?",
      action: "Publier un état des risques budgétaires avec scénarios.",
      severity: 3,
      sources: ["S26"]
    },
    {
      id: "governance",
      number: "12",
      domain: "gouvernance",
      label: "Gouvernance",
      title: "Sans mémoire de décision, la correction arrive trop tard",
      lead: "Consultation, chiffrage indépendant, données et clauses correctives déterminent la survie d’une mesure après la conférence de presse.",
      risk: "Les hypothèses deviennent introuvables et l’échec n’a ni propriétaire ni seuil de correction.",
      question: "Qui certifie, suit et déclenche la correction automatique ?",
      action: "Publier fiches mesure, journal des arbitrages et tableau de bord trimestriel.",
      severity: 5,
      sources: ["S1", "S4", "S23"]
    }
  ],

  parties: {
    nva: {
      short: "N-VA",
      role: "Premier ministre · Finances · Défense",
      axis: "Assainir d’abord par les dépenses, l’activation et les réformes structurelles.",
      redLine: "Maintenir l’ordre de grandeur des 10 milliards sans étouffer la croissance.",
      open: "Réorganisation de l’État, activation, fonctionnement et dépenses fiscales.",
      friction: "Réticence aux nouvelles taxes et pression accrue sur les dépenses de santé.",
      source: "Positions publiques et presse · à distinguer d’un accord",
      angle: 270
    },
    mr: {
      short: "MR",
      role: "Économie · Emploi · Intérieur · Énergie",
      axis: "Réduire les dépenses et soutenir l’offre, l’investissement et le taux d’emploi.",
      redLine: "Pas de hausse générale de TVA, pas de nouvel impôt, pas de saut d’index.",
      open: "Simplification, activation, non-indexation ciblée et économies administratives.",
      friction: "Rejette aussi une franchise santé annuelle malgré l’axe dépenses.",
      source: "Positions publiques · rendement non certifié",
      angle: 342
    },
    engages: {
      short: "Les Engagés",
      role: "Affaires étrangères · Mobilité · Action publique",
      axis: "Combiner responsabilité budgétaire, services essentiels et contribution progressive du patrimoine.",
      redLine: "Pas d’austérité linéaire dans les soins.",
      open: "Patrimoine financier, numérique, modernisation publique et niches ciblées.",
      friction: "Le rendement annoncé de la contribution patrimoniale doit être objectivé.",
      source: "Position partisane · assiette à préciser",
      angle: 54
    },
    vooruit: {
      short: "Vooruit",
      role: "Affaires sociales · Santé",
      axis: "Protéger l’index, les soins et la sécurité sociale ; faire contribuer les patrimoines élevés.",
      redLine: "L’index est sacré ; refus de fermer le déficit sur le dos des malades.",
      open: "Patrimoines, sociétés de management et réforme plus équitable du BIM.",
      friction: "Veto sur la franchise santé et conflit avec le MR sur les recettes.",
      source: "Position partisane · paramètres à chiffrer",
      angle: 126
    },
    cdv: {
      short: "CD&V",
      role: "Budget · Justice",
      axis: "Fermer les fuites fiscales et sociales plutôt que créer un impôt général improvisé.",
      redLine: "Préserver une trajectoire crédible et l’équité entre statuts.",
      open: "Spending reviews, flexi-jobs, management companies et réforme BIM.",
      friction: "Position charnière entre discipline, équité et milieux entrepreneuriaux.",
      source: "Position partisane · arbitrages ouverts",
      angle: 198
    }
  },

  tensions: [
    {axis: "Taxer ou couper", a: "N-VA · MR", b: "Vooruit · Engagés", level: 5, compromise: "Niches ciblées + dépenses évaluées"},
    {axis: "Santé", a: "Efficience", b: "Protection de l’accès", level: 5, compromise: "Trajectoire pluriannuelle + exemptions"},
    {axis: "Index", a: "Maîtrise des enveloppes", b: "Pouvoir d’achat", level: 5, compromise: "Ciblage hors salaires / allocations"},
    {axis: "Activation", a: "Obligation", b: "Accompagnement", level: 4, compromise: "Rendement net et budgets CPAS"},
    {axis: "Niches sociales", a: "Flexibilité", b: "Équité des statuts", level: 3, compromise: "Plafonds et clauses sectorielles"},
    {axis: "Défense", a: "Crédits rapides", b: "Trajectoire durable", level: 3, compromise: "Plan 2027–2035 transparent"}
  ],

  evidenceMatrix: [
    {criterion: "Séparation fait / option", values: ["fort", "faible", "faible", "fragile"]},
    {criterion: "Chronologie vérifiable", values: ["fort", "fragile", "faible", "faible"]},
    {criterion: "Sources primaires", values: ["fort", "partiel", "partiel", "partiel"]},
    {criterion: "Périmètres institutionnels", values: ["fort", "fragile", "fragile", "faible"]},
    {criterion: "Rendement brut / net", values: ["partiel", "faible", "faible", "faible"]},
    {criterion: "Incertitude explicite", values: ["fort", "fragile", "faible", "faible"]},
    {criterion: "Utilité principale", values: ["socle", "discours", "scénarios", "risques"]}
  ],

  statuses: [
    {id: "base", n: "01", title: "En vigueur dans la base", desc: "Droit existant ou décision déjà intégrée aux estimations."},
    {id: "decided", n: "02", title: "Décidé, exécution incomplète", desc: "Base légale ou accord existe ; rendement encore incertain."},
    {id: "commitment", n: "03", title: "Engagement politique", desc: "Objectif annoncé sans ventilation suffisante."},
    {id: "option", n: "04", title: "Option chiffrée", desc: "Simulation ou proposition d’un acteur identifié."},
    {id: "unverified", n: "05", title: "Non vérifié / anachronique", desc: "Source absente, circulaire ou postérieure à la date d’arrêté."}
  ],

  scenarios: {
    mix: {
      code: "A",
      name: "Compromis structurel mixte",
      deck: "Dépenses ciblées, niches fiscales, flexi-jobs, contribution patrimoniale et protections sociales.",
      reading: "Le compromis le plus équilibré. Sa crédibilité dépend de la précision juridique, du calendrier et des compensations, pas du total affiché.",
      ratings: {"Crédibilité UE": 4, "Tension coalition": 3, "Risque social": 2, "Risque croissance": 2, "Risque exécution": 3},
      tags: ["mix recettes/dépenses", "protections ciblées", "clauses correctives"]
    },
    cuts: {
      code: "B",
      name: "Consolidation dominée par les dépenses",
      deck: "Santé ciblée, activation, fonctionnement fédéral et compression d’enveloppes.",
      reading: "Compatible avec l’axe N-VA–MR, mais expose à des veto, à un choc social et à des transferts vers les CPAS.",
      ratings: {"Crédibilité UE": 3, "Tension coalition": 5, "Risque social": 5, "Risque croissance": 4, "Risque exécution": 4},
      tags: ["dépenses", "activation", "transferts de charge"]
    },
    delay: {
      code: "C",
      name: "Paquet temporaire ou retardé",
      deck: "Sous-utilisation de crédits, recettes uniques, dividendes et promesses de réformes ultérieures.",
      reading: "Évite la rupture immédiate, mais reporte l’ajustement et augmente le risque d’un nouveau conclave ou de corrections ultérieures.",
      ratings: {"Crédibilité UE": 1, "Tension coalition": 2, "Risque social": 2, "Risque croissance": 2, "Risque exécution": 5},
      tags: ["one-offs", "sous-utilisation", "réformes différées"]
    }
  },

  simulator: {
    nominal: {headline: 10, overlap: 0.8, phasing: 10, behavior: 7, transfers: 0.4, admin: 0.2},
    prudent: {headline: 10, overlap: 1.6, phasing: 22, behavior: 12, transfers: 0.9, admin: 0.3},
    structural: {headline: 10, overlap: 0.5, phasing: 8, behavior: 5, transfers: 0.4, admin: 0.5},
    sliders: [
      {id: "headline", label: "Montant politique affiché", min: 2, max: 15, step: 0.1, unit: "Md€", kind: "positive"},
      {id: "overlap", label: "Déjà dans la base / double compte", min: 0, max: 5, step: 0.1, unit: "Md€", kind: "negative"},
      {id: "phasing", label: "Décalage de mise en œuvre", min: 0, max: 50, step: 1, unit: "%", kind: "negative"},
      {id: "behavior", label: "Décote comportementale", min: 0, max: 35, step: 1, unit: "%", kind: "negative"},
      {id: "transfers", label: "Compensations et transferts", min: 0, max: 3, step: 0.1, unit: "Md€", kind: "negative"},
      {id: "admin", label: "Coût d’exécution", min: 0, max: 2, step: 0.1, unit: "Md€", kind: "negative"}
    ]
  },

  timeline: [
    {year: "2025", title: "Nouvelles règles UE", text: "Trajectoire pluriannuelle de dépenses nettes et plan national.", status: "cadre"},
    {year: "2026", title: "Arbitrage d’automne", text: "Budget 2027, trajectoire 2027–2029 et cible politique de 10 Md€.", status: "maintenant"},
    {year: "2027", title: "Premier rendement", text: "Entrées en vigueur, budgets CPAS, exécution administrative et premiers écarts.", status: "test"},
    {year: "2029", title: "Fin de trajectoire", text: "Plafond UE à 2,1 %, objectif politique et revue de l’engagement OTAN.", status: "jalon"},
    {year: "2031", title: "Dette à 122,6 %", text: "Scénario BOSA à politique inchangée ; ce n’est pas une fatalité.", status: "risque"},
    {year: "2035", title: "Défense + résilience", text: "3,5 % + jusqu’à 1,5 % du PIB selon l’engagement OTAN.", status: "horizon"}
  ],

  checklist: [
    "Quel est le rendement net en 2027, 2028 et 2029 — pas seulement le cumul ?",
    "Quelle part correspond à de nouvelles mesures et quelle part sécurise des montants existants ?",
    "Quelle part est structurelle, temporaire ou unique ?",
    "Le chiffre relève-t-il du solde nominal, de la dépense nette UE ou de la comptabilité fédérale ?",
    "Quel coût est déplacé vers les CPAS, communes, Régions ou ménages ?",
    "Quels textes doivent encore être votés et selon quel calendrier ?",
    "Qui certifie le rendement et avec quelle marge d’incertitude ?",
    "Quelles protections sont prévues pour les bas revenus et combien coûtent-elles ?",
    "Comment la défense sera-t-elle financée après 2029 ?",
    "Que devient la trajectoire si la croissance est plus faible ou les taux plus élevés ?",
    "Les économies administratives intègrent-elles les recettes éventuellement perdues ?",
    "Quels effets par décile, genre, âge, région et type de ménage ?",
    "Quels risques juridiques ou délais d’application réduisent le rendement ?",
    "Quand la Chambre et la Cour des comptes recevront-elles les tableaux complets ?",
    "Quelle clause corrige automatiquement un rendement inférieur aux prévisions ?"
  ],

  sources: [
    {id: "S1", org: "SPF BOSA", title: "Comité de monitoring : actualisation 2026 et estimations 2027–2031", date: "06.07.2026", area: "belgique", tags: ["déficit", "dette", "baseline"], url: "https://bosa.belgium.be/fr/news/comite-de-monitoring-actualisation-2026-estimation-2027-et-estimation-pluriannuelle-2028-2031"},
    {id: "S2", org: "SPF BOSA", title: "Annual Progress Report 2026", date: "30.04.2026", area: "belgique", tags: ["UE", "jalons", "spending reviews"], url: "https://bosa.belgium.be/sites/default/files/publications/documents/APR%202026%20report%20nl-fr_.pdf"},
    {id: "S3", org: "Conseil des ministres", title: "Amendement ciblé du Plan de relance et d’investissement", date: "29.05.2026", area: "belgique", tags: ["relance", "jalons"], url: "https://news.belgium.be/fr/amendement-cible-du-plan-de-relance-et-dinvestissement"},
    {id: "S4", org: "Commission européenne", title: "Rapport-pays 2026 pour la Belgique · COM(2026) 201", date: "2026", area: "europe", tags: ["cadre", "investissement", "exécution"], url: "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:52026DC0201"},
    {id: "S5", org: "Royaume de Belgique", title: "Plan budgétaire et structurel national à moyen terme", date: "2025", area: "belgique", tags: ["dépenses nettes", "trajectoire"], url: "https://economy-finance.ec.europa.eu/document/download/9aafb902-d754-4b8e-a202-1848cda5a4bb_en?filename=national_medium-term_fiscal-structural_plan_belgium_en.pdf"},
    {id: "S6", org: "Commission européenne", title: "Assessment of Belgium’s medium-term fiscal-structural plan", date: "2025", area: "europe", tags: ["cadre", "évaluation"], url: "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:52025DC0263"},
    {id: "S7", org: "État fédéral · Communautés · Régions", title: "Accord de coopération relatif au pacte budgétaire", date: "13.12.2013", area: "belgique", tags: ["interfédéral", "gouvernance"], url: "https://conseilsuperieurdesfinances.be/sites/default/files/downloads/samenwerkingsakkoord_13_december_2013.pdf"},
    {id: "S8", org: "FMI", title: "Belgium: 2026 Article IV Consultation", date: "19.02.2026", area: "international", tags: ["dette", "réformes", "capacité"], url: "https://www.imf.org/en/news/articles/2026/02/19/pr26057-belgium-imf-executive-board-concludes-2026-article-iv-consultation"},
    {id: "S9", org: "OTAN", title: "Déclaration du sommet de La Haye", date: "25.06.2025", area: "international", tags: ["défense", "2035"], url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/the-hague-summit-declaration"},
    {id: "S10", org: "OTAN", title: "Defence expenditures and NATO’s 5% commitment", date: "consulté 31.08.2026", area: "international", tags: ["défense", "classification"], url: "https://www.nato.int/en/what-we-do/introduction-to-nato/defence-expenditures-and-natos-5-commitment"},
    {id: "S11", org: "Bureau fédéral du Plan", title: "Comité d’étude sur le vieillissement · Rapport annuel 2026", date: "09.07.2026", area: "belgique", tags: ["vieillissement", "pensions", "santé"], url: "https://www.plan.be/fr/publications/comite-detude-sur-le-vieillissement-rapport-annuel-0"},
    {id: "S12", org: "Bureau fédéral du Plan", title: "Effets distributifs de la réforme des pensions", date: "13.04.2026", area: "belgique", tags: ["distribution", "pensions"], url: "https://www.plan.be/fr/publications/effets-distributifs-de-la-reforme-des-pensions-du"},
    {id: "S13", org: "Statbel", title: "More than 1.9 million Belgians are at risk of poverty or social exclusion", date: "2026", area: "belgique", tags: ["pauvreté", "ménages"], url: "https://statbel.fgov.be/en/news/more-19-million-belgians-are-risk-poverty-or-social-exclusion"},
    {id: "S14", org: "Institut pour l’égalité", title: "Loi gender mainstreaming du 12 janvier 2007", date: "consulté 31.08.2026", area: "belgique", tags: ["genre", "obligation"], url: "https://igvm-iefh.belgium.be/fr/themes/gender-mainstreaming/legislation"},
    {id: "S15", org: "Statbel", title: "Employment and unemployment · annual results 2025", date: "2026", area: "belgique", tags: ["emploi", "activation"], url: "https://statbel.fgov.be/en/themes/work-training/labour-market/employment-and-unemployment"},
    {id: "S16", org: "OCDE", title: "Taxing Wages 2026 · Progressivity of labour taxation", date: "2026", area: "international", tags: ["emploi", "fiscalité", "trappes"], url: "https://www.oecd.org/en/publications/taxing-wages-2026_3a5169ef-en/full-report/progressivity-of-labour-taxation-in-oecd-countries_80dc82f1.html"},
    {id: "S17", org: "INAMI", title: "Incapacités de travail en 2025 : dépression ou burnout", date: "2026", area: "belgique", tags: ["invalidité", "santé mentale"], url: "https://www.inami.fgov.be/fr/statistiques/statistiques-indemnites/statistiques-sur-les-incapacites-de-travail-decoulant-d-un-burnout-ou-d-une-depression/incapacites-de-travail-en-2025-combien-d-invalidites-en-raison-d-une-depression-ou-d-un-burnout-quel-cout-pour-l-assurance-indemnites"},
    {id: "S18", org: "Bureau fédéral du Plan", title: "Projection 2025–2035 des dépenses de soins de santé · PROMES", date: "28.04.2026", area: "belgique", tags: ["santé", "2035"], url: "https://www.plan.be/fr/publications/projection-sur-la-periode-2025-2035-des-depenses"},
    {id: "S19", org: "Agence fédérale de la Dette", title: "Données et indicateurs de dette", date: "consulté 31.08.2026", area: "belgique", tags: ["dette", "taux"], url: "https://www.debtagency.be/en"},
    {id: "S20", org: "Agence fédérale de la Dette", title: "Federal State financing plan 2026", date: "2026", area: "belgique", tags: ["refinancement", "émissions"], url: "https://www.debtagency.be/en/datafederalstatefinancingplan"},
    {id: "S21", org: "Agence fédérale de la Dette", title: "Review · Outlook 2025–2026", date: "2026", area: "belgique", tags: ["dette", "maturité"], url: "https://www.debtagency.be/sites/default/files/content/download/files/review_outlook_2025_2026_0.pdf"},
    {id: "S22", org: "SPF Finances", title: "Inventaire des dépenses fiscales fédérales", date: "consulté 31.08.2026", area: "belgique", tags: ["niches", "recettes"], url: "https://finances.belgium.be/fr/statistiques_et_analyses/chiffres-statistiques/budget-recettes"},
    {id: "S23", org: "Cour des comptes", title: "179e Cahier · politique budgétaire de l’État fédéral", date: "2022", area: "belgique", tags: ["audit", "gouvernance"], url: "https://www.ccrek.be/sites/default/files/Docs/179e_c_obs_fed_PartieIII_Synthese.pdf"},
    {id: "S24", org: "SPF Santé publique · Climat", title: "Cinquième inventaire fédéral des subventions aux énergies fossiles", date: "2026", area: "belgique", tags: ["fossile", "transition"], url: "https://climat.be/actualites/2026/5e-inventaire-federal-des-subventions-aux-energies-fossiles"},
    {id: "S25", org: "Commission européenne", title: "Assessment of Belgium’s final updated National Energy and Climate Plan", date: "23.01.2026", area: "europe", tags: ["climat", "énergie"], url: "https://commission.europa.eu/document/download/0625cf3f-01b0-4777-9929-93883480618a_en?filename=BE_swd_2026_24_en.pdf"},
    {id: "S26", org: "Eurostat", title: "Contingent liabilities and non-performing loans · statistics", date: "consulté 31.08.2026", area: "europe", tags: ["garanties", "hors bilan"], url: "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Contingent_liabilities_and_non-performing_loans_-_statistics"}
  ],

  graph: {
    nodes: [
      {id: "target", type: "metric", label: "10 Md€", kicker: "Cible politique", status: "engagement politique", horizon: "2027–2029", confidence: "moyenne", description: "Effort complémentaire annoncé pour la fin de la législature. Sa composition, sa référence et son profil annuel ne sont pas publics.", question: "Quelle part est nouvelle, structurelle et exécutable en 2027 ?", sources: ["S1", "S5"], x: 600, y: 350, r: 48},
      {id: "gap", type: "metric", label: "7,7 Md€", kicker: "Écart dépenses nettes", status: "estimation officielle", horizon: "cumul 2025–2029", confidence: "forte", description: "Déviation cumulée sur la trajectoire européenne de dépenses nettes. Ce n’est ni le déficit annuel ni une somme à couper en une année.", question: "Quel pont relie l’effort politique à la métrique UE ?", sources: ["S1", "S5", "S6"], x: 430, y: 300, r: 32},
      {id: "deficit", type: "metric", label: "5,1 %", kicker: "Déficit public 2027", status: "scénario inchangé", horizon: "2027", confidence: "forte", description: "Déficit de l’ensemble des administrations publiques à politique inchangée selon BOSA.", question: "Quelle part du paquet améliore effectivement le solde 2027 ?", sources: ["S1"], x: 720, y: 250, r: 32},
      {id: "debt", type: "metric", label: "122,6 %", kicker: "Dette publique", status: "scénario inchangé", horizon: "2031", confidence: "forte", description: "Projection BOSA de dette publique à politique inchangée. C’est un stock, pas une économie annuelle à trouver.", question: "Quel stress test de taux accompagne la trajectoire ?", sources: ["S1", "S19"], x: 790, y: 400, r: 34},
      {id: "growth", type: "metric", label: "≈ 1 %", kicker: "Croissance réelle", status: "projection", horizon: "2027", confidence: "moyenne", description: "Ordre de grandeur qui réduit la marge d’erreur : une consolidation mal séquencée peut dégrader l’assiette.", question: "Quel multiplicateur et quel effet investissement sont retenus ?", sources: ["S4", "S8"], x: 500, y: 470, r: 30},

      {id: "defense", type: "blindspot", label: "Défense 2035", kicker: "Angle mort 01", status: "engagement international", horizon: "2035", confidence: "forte", description: "La trajectoire ne s’arrête plus à 2 % : 3,5 % de défense de base et jusqu’à 1,5 % de résilience sont visés.", question: "Quel pont budgétaire 2027–2035 évite un mur après 2029 ?", sources: ["S9", "S10"], x: 710, y: 95, r: 29},
      {id: "interfederal", type: "blindspot", label: "Interfédéral", kicker: "Angle mort 02", status: "gouvernance incomplète", horizon: "2027–2029", confidence: "forte", description: "Le déficit est consolidé, mais l’effort et les compétences sont distribués entre niveaux de pouvoir.", question: "Qui paie, compense et corrige ?", sources: ["S5", "S7"], x: 965, y: 245, r: 29},
      {id: "ageing", type: "blindspot", label: "Vieillissement", kicker: "Angle mort 03", status: "projection", horizon: "2025–2035", confidence: "forte", description: "La facture se déplace vers la santé, la dépendance et les soins de longue durée.", question: "Quel effet à dix ans plutôt qu’une seule enveloppe 2027 ?", sources: ["S11", "S18"], x: 930, y: 505, r: 29},
      {id: "reviews", type: "blindspot", label: "Spending reviews", kicker: "Angle mort 04", status: "options", horizon: "2026–2027", confidence: "moyenne", description: "Une revue identifie des pistes ; elle n’est pas une économie tant que décision, texte et exécution manquent.", question: "Quel propriétaire et quel calendrier pour chaque option ?", sources: ["S2", "S3"], x: 755, y: 610, r: 28},
      {id: "distribution", type: "blindspot", label: "Distribution", kicker: "Angle mort 05", status: "test requis", horizon: "ex ante", confidence: "forte", description: "L’impact varie par décile, ménage, genre, âge, région et handicap.", question: "Qui supporte l’effort net après compensation ?", sources: ["S12", "S13", "S14"], x: 500, y: 635, r: 28},
      {id: "activation", type: "blindspot", label: "Activation", kicker: "Angle mort 06", status: "rendement incertain", horizon: "2027–2029", confidence: "moyenne", description: "Santé, compétences, garde, mobilité et fiscalité conditionnent le retour à l’emploi.", question: "Combien de transitions durables, quels transferts vers CPAS ?", sources: ["S15", "S16", "S17"], x: 280, y: 540, r: 28},
      {id: "refinancing", type: "blindspot", label: "Refinancement", kicker: "Angle mort 07", status: "risque de marché", horizon: "annuel", confidence: "forte", description: "Les taux se transmettent progressivement via les émissions et la maturité de la dette.", question: "Quel besoin annuel sous +100 / +200 pb ?", sources: ["S19", "S20", "S21"], x: 190, y: 365, r: 28},
      {id: "tax-expenditures", type: "blindspot", label: "Niches fiscales", kicker: "Angle mort 08", status: "inventaire incomplet", horizon: "récurrent", confidence: "forte", description: "Le volume d’une dépense fiscale n’est pas son rendement net récupérable.", question: "Quel objectif, quel bénéficiaire, quelle additionnalité ?", sources: ["S22", "S23"], x: 250, y: 180, r: 28},
      {id: "fossil", type: "blindspot", label: "Fiscalité fossile", kicker: "Angle mort 09", status: "stock inventorié", horizon: "transition", confidence: "moyenne", description: "10,8 Md€ d’avantages recensés ne sont pas 10,8 Md€ de recettes faciles.", question: "Quel séquençage et quelles alternatives ?", sources: ["S24", "S25"], x: 430, y: 90, r: 28},
      {id: "capacity", type: "blindspot", label: "Capacité État", kicker: "Angle mort 10", status: "risque d’exécution", horizon: "immédiat", confidence: "forte", description: "Couper effectifs et IT peut détruire le rendement des contrôles, services et réformes.", question: "Quelle capacité minimale protège recettes et investissement ?", sources: ["S2", "S4", "S8"], x: 1050, y: 420, r: 28},
      {id: "contingent", type: "blindspot", label: "Hors bilan", kicker: "Angle mort 11", status: "inventaire partiel", horizon: "pluriannuel", confidence: "moyenne", description: "Garanties et engagements peuvent créer des appels futurs avant d’entrer dans Maastricht.", question: "Quelle probabilité d’appel et quelle provision ?", sources: ["S26"], x: 620, y: 665, r: 28},
      {id: "governance", type: "blindspot", label: "Gouvernance", kicker: "Angle mort 12", status: "architecture requise", horizon: "avant / après accord", confidence: "forte", description: "Sans fiche, propriétaire, suivi et clause corrective, le rendement n’a pas de mémoire.", question: "Qui certifie et déclenche la correction ?", sources: ["S1", "S23"], x: 130, y: 500, r: 28},

      {id: "nva", type: "actor", label: "N-VA", kicker: "Coalition", status: "position publique", horizon: "conclave", confidence: "moyenne", description: "Dépenses, activation et réformes structurelles ; réticence aux nouvelles taxes.", question: "Quel effort est acceptable sans fragiliser croissance et coalition ?", sources: [], x: 550, y: 180, r: 25},
      {id: "mr", type: "actor", label: "MR", kicker: "Coalition", status: "position publique", horizon: "conclave", confidence: "moyenne", description: "Priorité aux dépenses et au taux d’emploi ; refus de nouvel impôt général et du saut d’index.", question: "Quelles recettes ciblées peuvent passer la ligne rouge ?", sources: [], x: 850, y: 315, r: 25},
      {id: "engages", type: "actor", label: "Engagés", kicker: "Coalition", status: "position publique", horizon: "conclave", confidence: "moyenne", description: "Responsabilité budgétaire, services essentiels et contribution du patrimoine financier.", question: "Comment objectiver assiette et rendement ?", sources: [], x: 820, y: 530, r: 25},
      {id: "vooruit", type: "actor", label: "Vooruit", kicker: "Coalition", status: "position publique", horizon: "conclave", confidence: "moyenne", description: "Protection de l’index, des soins et de la sécurité sociale ; contribution des grands patrimoines.", question: "Quelles économies de santé restent acceptables ?", sources: [], x: 390, y: 555, r: 25},
      {id: "cdv", type: "actor", label: "CD&V", kicker: "Coalition", status: "position charnière", horizon: "conclave", confidence: "moyenne", description: "Discipline budgétaire, fermeture des fuites et équité entre statuts.", question: "Quelle combinaison rend le paquet certifiable ?", sources: [], x: 345, y: 320, r: 25},

      {id: "S1", type: "source", label: "BOSA", kicker: "Source S1", status: "primaire", horizon: "06.07.2026", confidence: "forte", description: "Actualisation du Comité de monitoring et trajectoire à politique inchangée.", question: "Quelle baseline est utilisée ?", sources: ["S1"], x: 1030, y: 120, r: 19},
      {id: "S4", type: "source", label: "Commission", kicker: "Source S4", status: "primaire", horizon: "2026", confidence: "forte", description: "Rapport-pays 2026 pour la Belgique.", question: "Quels risques et investissements sont identifiés ?", sources: ["S4"], x: 1120, y: 290, r: 19},
      {id: "S5", type: "source", label: "Plan belge", kicker: "Source S5", status: "primaire", horizon: "2025–2029", confidence: "forte", description: "Plan budgétaire et structurel national à moyen terme.", question: "Quels plafonds de dépenses nettes ?", sources: ["S5"], x: 1100, y: 560, r: 19},
      {id: "S8", type: "source", label: "FMI", kicker: "Source S8", status: "institutionnelle", horizon: "2026", confidence: "forte", description: "Consultation Article IV pour la Belgique.", question: "Quel équilibre consolidation / croissance ?", sources: ["S8"], x: 940, y: 650, r: 19},
      {id: "S9", type: "source", label: "OTAN", kicker: "Source S9", status: "primaire", horizon: "2035", confidence: "forte", description: "Déclaration du sommet de La Haye.", question: "Que recouvrent 3,5 % + 1,5 % ?", sources: ["S9"], x: 820, y: 55, r: 19},
      {id: "S11", type: "source", label: "Vieillissement", kicker: "Source S11", status: "primaire", horizon: "2026", confidence: "forte", description: "Rapport annuel du Comité d’étude sur le vieillissement.", question: "Quel coût social à long terme ?", sources: ["S11"], x: 1010, y: 610, r: 19},
      {id: "S12", type: "source", label: "Distribution", kicker: "Source S12", status: "primaire", horizon: "2026", confidence: "forte", description: "Effets distributifs de la réforme des pensions.", question: "Quels groupes gagnent ou perdent ?", sources: ["S12"], x: 465, y: 690, r: 19},
      {id: "S13", type: "source", label: "Statbel", kicker: "Source S13", status: "primaire", horizon: "2026", confidence: "forte", description: "Risque de pauvreté ou d’exclusion sociale.", question: "Quel point de départ social ?", sources: ["S13"], x: 250, y: 660, r: 19},
      {id: "S15", type: "source", label: "Emploi", kicker: "Source S15", status: "primaire", horizon: "2025", confidence: "forte", description: "Résultats annuels emploi et chômage.", question: "Quel bassin réel d’activation ?", sources: ["S15"], x: 80, y: 600, r: 19},
      {id: "S17", type: "source", label: "INAMI", kicker: "Source S17", status: "primaire", horizon: "2025", confidence: "forte", description: "Invalidités liées à dépression ou burnout.", question: "Quel frein de santé mentale ?", sources: ["S17"], x: 70, y: 395, r: 19},
      {id: "S18", type: "source", label: "PROMES", kicker: "Source S18", status: "primaire", horizon: "2025–2035", confidence: "forte", description: "Projection des dépenses de soins de santé.", question: "Quel profil à dix ans ?", sources: ["S18"], x: 1140, y: 480, r: 19},
      {id: "S19", type: "source", label: "Dette", kicker: "Source S19", status: "primaire", horizon: "courant", confidence: "forte", description: "Données et indicateurs de l’Agence fédérale de la Dette.", question: "Quel coût de refinancement ?", sources: ["S19"], x: 70, y: 265, r: 19},
      {id: "S22", type: "source", label: "Finances", kicker: "Source S22", status: "primaire", horizon: "inventaire", confidence: "forte", description: "Inventaire des dépenses fiscales fédérales.", question: "Quel stock est réellement évaluable ?", sources: ["S22"], x: 125, y: 120, r: 19},
      {id: "S24", type: "source", label: "Climat", kicker: "Source S24", status: "primaire", horizon: "2026", confidence: "forte", description: "Cinquième inventaire des subventions fossiles.", question: "Quel stock et quelles catégories ?", sources: ["S24"], x: 350, y: 45, r: 19},
      {id: "S26", type: "source", label: "Eurostat", kicker: "Source S26", status: "primaire", horizon: "annuel", confidence: "forte", description: "Statistiques sur passifs contingents et prêts non performants.", question: "Quels risques restent hors flux ?", sources: ["S26"], x: 690, y: 700, r: 19}
    ],
    links: [
      ["target", "gap", "comparaison"], ["target", "deficit", "objectif"], ["target", "debt", "effet"], ["target", "growth", "contrainte"],
      ["target", "nva", "négociation"], ["target", "mr", "négociation"], ["target", "engages", "négociation"], ["target", "vooruit", "négociation"], ["target", "cdv", "négociation"],
      ["target", "reviews", "rendement"], ["target", "governance", "certification"], ["target", "interfederal", "répartition"],
      ["gap", "S5", "preuve"], ["gap", "S1", "preuve"], ["deficit", "S1", "preuve"], ["debt", "S1", "preuve"], ["debt", "S19", "stress"], ["growth", "S4", "preuve"], ["growth", "S8", "preuve"],
      ["defense", "S9", "preuve"], ["defense", "target", "contrainte future"], ["defense", "growth", "arbitrage"],
      ["interfederal", "S5", "cadre"], ["interfederal", "deficit", "consolidation"], ["interfederal", "activation", "transfert"],
      ["ageing", "S11", "preuve"], ["ageing", "S18", "projection"], ["ageing", "vooruit", "veto"],
      ["reviews", "S4", "cadre"], ["reviews", "capacity", "exécution"], ["reviews", "cdv", "levier"],
      ["distribution", "S12", "preuve"], ["distribution", "S13", "preuve"], ["distribution", "vooruit", "contrainte"], ["distribution", "engages", "contrainte"],
      ["activation", "S15", "preuve"], ["activation", "S17", "santé"], ["activation", "mr", "levier"], ["activation", "nva", "levier"],
      ["refinancing", "S19", "preuve"], ["refinancing", "debt", "transmission"], ["refinancing", "deficit", "intérêts"],
      ["tax-expenditures", "S22", "inventaire"], ["tax-expenditures", "cdv", "levier"], ["tax-expenditures", "mr", "tension"],
      ["fossil", "S24", "preuve"], ["fossil", "tax-expenditures", "sous-ensemble"], ["fossil", "growth", "transition"],
      ["capacity", "S4", "cadre"], ["capacity", "reviews", "dépendance"], ["capacity", "activation", "mise en œuvre"],
      ["contingent", "S26", "preuve"], ["contingent", "debt", "risque"],
      ["governance", "S1", "données"], ["governance", "target", "certification"], ["governance", "reviews", "suivi"],
      ["nva", "mr", "convergence"], ["vooruit", "engages", "convergence"], ["mr", "vooruit", "tension"], ["cdv", "mr", "négociation"], ["cdv", "vooruit", "négociation"], ["nva", "engages", "tension"]
    ]
  },

  glossary: [
    {term: "Dépenses nettes", definition: "Agrégat européen corrigé de certains postes ; il ne se confond pas avec la dépense fédérale totale.", href: "#credibilite"},
    {term: "Baseline", definition: "Scénario à politique inchangée utilisé comme référence de calcul.", href: "#preuves"},
    {term: "Rendement net", definition: "Effet après compensations, coûts, comportements, délais et interactions.", href: "#credibilite"},
    {term: "Entité I", definition: "Pouvoir fédéral et sécurité sociale dans la présentation budgétaire belge.", href: "#situation"},
    {term: "Passif contingent", definition: "Obligation potentielle qui ne devient une dépense ou une dette que si un événement survient.", href: "#angles-morts"},
    {term: "Spending review", definition: "Évaluation structurée d’une dépense ; elle produit des options, pas automatiquement des économies.", href: "#angles-morts"}
  ]
};
