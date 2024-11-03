export default function NewsTag({ author, category, date }) {
  const dateFormat = new Date(date);
  date = dateFormat.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-wrap gap-2 text-[10px] md:text-xs lg:gap-5">
      <p className="flex items-center gap-1">
        <span>🧑🏻‍🦱</span>
        {author}
      </p>
      <p className="hidden items-center gap-1 lg:flex">
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
