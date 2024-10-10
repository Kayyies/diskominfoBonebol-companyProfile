export default function NewsTag({ author, category, date }) {
    const dateFormat = new Date(date);
    date = dateFormat.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="flex flex-wrap gap-2 lg:gap-5 text-xs">
            <p className="flex items-center gap-1">
                <span>🧑🏻‍🦱</span>
                {author}
            </p>
            <p className="hidden lg:flex items-center gap-1">
                <span>📌</span>
                {category}
            </p>
            <p className="flex items-center gap-1">
                <span>📅</span>
                {date}
            </p>
        </div>
    );
}
