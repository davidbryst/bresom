import { LiteHeader } from 'bresom-lite';

// Fixed-position header — cfg.overrides.LiteHeader forces a single-story
// card with an explicit viewport so it renders inside its own card bounds
// instead of escaping to the document root.
export const Default = () => <LiteHeader />;
