export default function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-md text-center py-4 text-sm text-gray-600 border-t border-white/30">
      © {new Date().getFullYear()} React Mini Projects — Tous droits réservés.
    </footer>
  );
}
