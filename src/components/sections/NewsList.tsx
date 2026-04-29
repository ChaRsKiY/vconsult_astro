import React, { useState, useMemo } from "react";
import { ArrowRight, Calendar, Tag as TagIcon, LayoutGrid, List, ChevronDown, Check } from "lucide-react";
import { allArticles } from "@/data/news";

export const NewsList: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isTagOpen, setIsTagOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

    const categories = useMemo(() => Array.from(new Set(allArticles.map((a) => a.category))), []);
    const tags = useMemo(() => Array.from(new Set(allArticles.flatMap((a) => a.tags))), []);

    const filteredAndSortedArticles = useMemo(() => {
        let result = [...allArticles];
        if (selectedCategory) result = result.filter((a) => a.category === selectedCategory);
        if (selectedTags.length > 0) result = result.filter((a) => selectedTags.some(t => a.tags.includes(t)));
        result.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });
        return result;
    }, [selectedCategory, selectedTags, sortOrder]);

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" });

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <section className="py-20 bg-neutral-soft">
            <div className="max-w-7xl mx-auto px-6">
                {/* Utility Bar */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border-light mb-12 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative z-20">
                    <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
                        {/* Category */}
                        <div className="relative w-full sm:w-56">
                            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-2">
                                <LayoutGrid className="w-4 h-4 text-primary" /> Kategorie
                            </label>
                            <div className="relative">
                                <button
                                    onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsTagOpen(false); setIsSortOpen(false); }}
                                    className="w-full bg-neutral-soft text-slate-700 text-sm rounded-xl px-4 py-2.5 flex justify-between items-center transition-colors focus:ring-2 focus:ring-primary focus:outline-none"
                                >
                                    <span className="truncate font-medium">{selectedCategory || "Alle Kategorien"}</span>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isCategoryOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsCategoryOpen(false)} />
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-light rounded-xl shadow-xl z-20 py-2">
                                            <button
                                                onClick={() => { setSelectedCategory(null); setIsCategoryOpen(false); }}
                                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-soft flex items-center justify-between transition-colors ${!selectedCategory ? 'font-bold text-primary bg-primary/5' : 'text-slate-700'}`}
                                            >
                                                Alle Kategorien
                                                {!selectedCategory && <Check className="w-4 h-4 text-primary" />}
                                            </button>
                                            {categories.map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
                                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-soft flex items-center justify-between transition-colors ${selectedCategory === cat ? 'font-bold text-primary bg-primary/5' : 'text-slate-700'}`}
                                                >
                                                    {cat}
                                                    {selectedCategory === cat && <Check className="w-4 h-4 text-primary" />}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="relative w-full sm:w-56">
                            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-2">
                                <TagIcon className="w-4 h-4 text-primary" /> Tags
                            </label>
                            <div className="relative">
                                <button
                                    onClick={() => { setIsTagOpen(!isTagOpen); setIsCategoryOpen(false); setIsSortOpen(false); }}
                                    className="w-full bg-neutral-soft text-slate-700 text-sm rounded-xl px-4 py-2.5 flex justify-between items-center transition-colors focus:ring-2 focus:ring-primary focus:outline-none"
                                >
                                    <span className="truncate font-medium">
                                        {selectedTags.length === 0 ? "Alle Tags" : `${selectedTags.length} Tag${selectedTags.length > 1 ? 's' : ''} gewählt`}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isTagOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isTagOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsTagOpen(false)} />
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-light rounded-xl shadow-xl z-20 py-2 max-h-60 overflow-y-auto">
                                            <button
                                                onClick={() => setSelectedTags([])}
                                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-soft flex items-center gap-3 transition-colors ${selectedTags.length === 0 ? 'font-bold text-slate-900' : 'text-slate-700'}`}
                                            >
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTags.length === 0 ? 'bg-primary border-primary' : 'border-slate-300 bg-white'}`}>
                                                    {selectedTags.length === 0 && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                Alle Tags
                                            </button>
                                            {tags.map(tag => {
                                                const isSelected = selectedTags.includes(tag);
                                                return (
                                                    <button
                                                        key={tag}
                                                        onClick={() => toggleTag(tag)}
                                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-soft flex items-center gap-3 transition-colors ${isSelected ? 'font-bold text-slate-900' : 'text-slate-700'}`}
                                                    >
                                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'border-slate-300 bg-white'}`}>
                                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                                        </div>
                                                        #{tag}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sort */}
                    <div className="relative w-full md:w-56 shrink-0">
                        <label className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-2">
                            <List className="w-4 h-4 text-primary" /> Sortierung
                        </label>
                        <div className="relative">
                            <button
                                onClick={() => { setIsSortOpen(!isSortOpen); setIsCategoryOpen(false); setIsTagOpen(false); }}
                                className="w-full bg-neutral-soft text-slate-700 text-sm rounded-xl px-4 py-2.5 flex justify-between items-center transition-colors focus:ring-2 focus:ring-primary focus:outline-none"
                            >
                                <span className="truncate font-medium">{sortOrder === "newest" ? "Neueste zuerst" : "Älteste zuerst"}</span>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isSortOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                                    <div className="absolute top-full left-0 md:left-auto md:right-0 w-full mt-2 bg-white border border-border-light rounded-xl shadow-xl z-20 py-2">
                                        <button
                                            onClick={() => { setSortOrder("newest"); setIsSortOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-soft flex items-center justify-between transition-colors ${sortOrder === "newest" ? 'font-bold text-primary bg-primary/5' : 'text-slate-700'}`}
                                        >
                                            Neueste zuerst
                                            {sortOrder === "newest" && <Check className="w-4 h-4 text-primary" />}
                                        </button>
                                        <button
                                            onClick={() => { setSortOrder("oldest"); setIsSortOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-soft flex items-center justify-between transition-colors ${sortOrder === "oldest" ? 'font-bold text-primary bg-primary/5' : 'text-slate-700'}`}
                                        >
                                            Älteste zuerst
                                            {sortOrder === "oldest" && <Check className="w-4 h-4 text-primary" />}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Article Grid */}
                {filteredAndSortedArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                        {filteredAndSortedArticles.map((article) => (
                            <div key={article.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-border-light hover:shadow-xl transition-all duration-300">
                                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                    <img
                                        alt={article.title}
                                        src={article.image}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white w-fit">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-4">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {formatDate(article.date)}
                                    </div>
                                    <a href={`/news/${article.slug}`}>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-primary transition-colors">
                                            {article.title}
                                        </h3>
                                    </a>
                                    <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed">{article.shortDescription}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {article.tags.map(tag => (
                                            <span key={tag} className="text-xs font-medium text-slate-500 bg-neutral-soft px-2 py-1 rounded-md">#{tag}</span>
                                        ))}
                                    </div>
                                    <div className="pt-4 border-t border-border-light mt-auto">
                                        <a href={`/news/${article.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                                            Artikel lesen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-2xl border border-border-light relative z-10">
                        <p className="text-slate-500 text-lg">Keine Artikel gefunden, die Ihren Kriterien entsprechen.</p>
                        <button
                            className="mt-6 rounded-xl font-bold transition-all inline-flex items-center justify-center gap-2 border border-border-light bg-white text-slate-900 shadow-none hover:bg-neutral-soft px-8 py-3 text-sm"
                            onClick={() => { setSelectedCategory(null); setSelectedTags([]); }}
                        >
                            Filter zurücksetzen
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewsList;
