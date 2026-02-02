import { Item } from "../../components/Sidebar/Item";
import { Section } from "../../components/Sidebar/Section";

export function Sidebar() {
  return (
    <aside className="w-56 border-r border-theme p-4 text-sm">
      <nav className="flex flex-col gap-4">
        {/* Home */}
        <Item to="/home" label="Início" />

        {/* Library */}
        <Section title="Biblioteca">
          <Item to="/genres" label="Gêneros" />
          <Item to="/artists" label="Artistas" />
          <Item to="/albums" label="Álbuns" />
          <Item to="/tracks" label="Músicas" />
        </Section>

        {/* Tools */}
        <Section title="Ferramentas">
          <Item to="/download" label="Download" />
        </Section>

        {/* Player */}
        <Section title="Player">
          <Item to="/now-playing" label="Now Playing" />
        </Section>

        {/* Settings */}
        <Section title="Configurações">
          <Item to="/themes" label="Temas" />
        </Section>
      </nav>
    </aside>
  );
}
