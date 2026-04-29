export type Article = {
    id: string;
    title: string;
    category: string;
    tags: string[];
    date: string;
    image: string;
    shortDescription: string;
    slug: string;
    content: string;
};

export const allArticles: Article[] = [
    {
        id: "1",
        title: "Effizienzsteigerung im automatisierten Lager",
        category: "Logistik",
        tags: ["EWM", "Automatisierung", "Industrie 4.0"],
        date: "2024-03-15",
        image: "/blog_logistik.png",
        shortDescription: "Wie moderne SAP EWM Strategien die Durchlaufzeiten in der industriellen Fertigung halbieren können. Eine tiefgehende Analyse der neuesten Features.",
        slug: "effizienzsteigerung-im-automatisierten-lager",
        content: `
# Effizienzsteigerung im automatisierten Lager

Die Einführung von **SAP Extended Warehouse Management (EWM)** stellt für viele Unternehmen einen entscheidenden Schritt in Richtung Industrie 4.0 dar. In diesem Artikel beleuchten wir die wichtigsten Faktoren für eine erfolgreiche Implementierung.

## Warum Automatisierung?
Automatisierte Lager bieten zahlreiche Vorteile:
- **Höhere Geschwindigkeit** bei der Kommissionierung.
- *Fehlerreduktion* durch systemgeführte Prozesse.
- Optimale Ausnutzung der Lagerkapazitäten.

> "Die Zukunft der Logistik liegt in der nahtlosen Integration von Hardware und intelligenten Softwarelösungen."

### Wichtige Meilensteine

1. Analyse der bestehenden Materialflüsse
2. Definition der Soll-Prozesse
3. Auswahl der passenden Fördertechnik
4. MFS (Material Flow System) Integration in SAP EWM

Weitere Informationen finden Sie in unseren Case Studies.
        `,
    },
    {
        id: "2",
        title: "Der Weg zur Clean Core Architektur",
        category: "S/4HANA",
        tags: ["Migration", "Clean Core", "Architektur"],
        date: "2024-02-28",
        image: "/blog_s4hana.png",
        shortDescription: "Best Practices für die S/4HANA Migration ohne Altlasten. Erfahren Sie, wie zukunftssichere Prozesse gestaltet werden.",
        slug: "der-weg-zur-clean-core-architektur",
        content: `
# Der Weg zur Clean Core Architektur

Die S/4HANA Transition bietet die einmalige Chance, historisch gewachsene Z-Eigenentwicklungen („Altlasten“) abzubauen. Eine **Clean Core Strategie** zielt darauf ab, den SAP-Standard so weit wie möglich zu nutzen.

## Vorteile des Clean Core
- Einfachere Release-Wechsel und Upgrades.
- Verbesserte Stabilität des Kernsystems.
- Höhere Flexibilität durch Nutzung der SAP Business Technology Platform (BTP) für Erweiterungen.

### Wie starten?
Beginnen Sie mit einer umfassenden Readiness-Check Analyse und identifizieren Sie ungenutzten Custom Code.
        `,
    },
    {
        id: "3",
        title: "KI in der vorausschauenden Wartung",
        category: "Künstliche Intelligenz",
        tags: ["KI", "Wartung", "Machine Learning"],
        date: "2024-04-05",
        image: "/blog_ai.png",
        shortDescription: "Wie intelligentes maschinelles Lernen genutzt wird, um Ausfallzeiten in der Produktion fast vollständig zu eliminieren.",
        slug: "ki-in-der-vorausschauenden-wartung",
        content: `
# KI in der vorausschauenden Wartung

Predictive Maintenance (vorausschauende Wartung) verändert die Art und Weise, wie Industrieanlagen instand gehalten werden, grundlegend. Durch den Einsatz von Sensordaten und Machine Learning-Algorithmen können Ausfälle vorhergesagt werden, *bevor* sie passieren.

## Sensorik und Daten
Die Grundlage bilden IoT-Sensoren, die permanent Daten wie Temperatur, Vibration und Druck erfassen. Diese Datenströme werden in Echtzeit analysiert.

### Der Mehrwert von SAP AI
Mit den integrierten KI-Services von SAP lassen sich diese riesigen Datenmengen effizient verarbeiten und Instandhaltungsaufträge (PM) automatisch generieren.
        `,
    },
    {
        id: "4",
        title: "Digitale Transformation im Mittelstand",
        category: "Strategie",
        tags: ["Mittelstand", "Transformation", "mBaIT"],
        date: "2024-01-12",
        image: "/blog_transformation.png",
        shortDescription: "Warum die mBaIT-Philosophie gerade für mittelständische Industrieunternehmen der Schlüssel zum digitalen Erfolg ist.",
        slug: "digitale-transformation-im-mittelstand",
        content: `
# Digitale Transformation im Mittelstand

Der Mittelstand steht vor der großen Herausforderung, traditionelle Geschäftsmodelle in die digitale Welt zu überführen. Hierbei stoßen Standard-Consulting-Ansätze oft an ihre Grenzen.

## Die mBaIT Philosophie
**Verschmelzung von Business und IT** – das ist der Kern unseres Ansatzes. Wir verstehen, dass Technologie kein Selbstzweck ist. Sie muss:
1. Den Geschäftsanforderungen bedingungslos dienen.
2. Von den Mitarbeitern akzeptiert und gelebt werden.
3. Messbaren Mehrwert (ROI) generieren.

Lassen Sie uns gemeinsam Ihre digitale Roadmap entwickeln.
        `,
    },
];

export function getArticleBySlug(slug: string): Article | undefined {
    return allArticles.find(article => article.slug === slug);
}
