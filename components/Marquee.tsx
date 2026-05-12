export default function Marquee() {
  const text =
    "Brunch fait maison ✦ 7j/7 dès 10h ✦ Café de spécialité ✦ Parc des Oblats ✦ Liège ✦ Produits frais ✦ Ouvert tous les jours ✦ ";

  return (
    <div className="bg-ember overflow-hidden py-3 select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Texte dupliqué pour boucle seamless */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-sans text-parchment text-[10px] tracking-[0.25em] uppercase inline-block"
          >
            {text}
            {text}
            {text}
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
