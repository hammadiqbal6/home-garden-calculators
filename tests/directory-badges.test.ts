import { describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_BADGE_HEIGHT,
  DEFAULT_BADGE_WIDTH,
  FAZIER_BADGE,
  FAZIER_DIRECTORY_BADGES_JSON,
  normalizeDirectoryBadge,
  parseDirectoryBadgesJson,
  resolveDirectoryBadges,
} from '../src/lib/directoryBadges';

describe('normalizeDirectoryBadge', () => {
  it('requires href, img, and alt', () => {
    const warn = vi.fn();
    expect(normalizeDirectoryBadge({ href: 'https://x.test' }, warn)).toBeNull();
    expect(warn).toHaveBeenCalled();
  });

  it('applies default width/height and optional rel', () => {
    const badge = normalizeDirectoryBadge({
      href: 'https://tinylaunch.example/',
      img: 'https://cdn.example/badge.svg',
      alt: 'TinyLaunch',
      rel: 'noopener',
    });
    expect(badge).toEqual({
      href: 'https://tinylaunch.example/',
      img: 'https://cdn.example/badge.svg',
      alt: 'TinyLaunch',
      width: DEFAULT_BADGE_WIDTH,
      height: DEFAULT_BADGE_HEIGHT,
      rel: 'noopener',
    });
  });

  it('drops launching-soon badges even when fields are otherwise valid', () => {
    const warn = vi.fn();
    expect(
      normalizeDirectoryBadge(
        {
          href: 'https://tinylaunch.com',
          img: 'https://tinylaunch.com/tinylaunch_badge_launching_soon.svg',
          alt: 'TinyLaunch Badge',
          width: 202,
          height: 48,
        },
        warn,
      ),
    ).toBeNull();
    expect(warn).toHaveBeenCalled();
  });
});

describe('parseDirectoryBadgesJson', () => {
  it('returns [] and warns on invalid JSON without throwing', () => {
    const warn = vi.fn();
    expect(parseDirectoryBadgesJson('{not-json', warn)).toEqual([]);
    expect(warn).toHaveBeenCalledOnce();
  });

  it('returns [] and warns when JSON is not an array', () => {
    const warn = vi.fn();
    expect(parseDirectoryBadgesJson('{"href":"x"}', warn)).toEqual([]);
    expect(warn).toHaveBeenCalledOnce();
  });

  it('keeps valid entries and skips bad ones', () => {
    const warn = vi.fn();
    const badges = parseDirectoryBadgesJson(
      JSON.stringify([
        { href: 'https://a.test', img: 'https://a.test/a.svg', alt: 'A', width: 100, height: 40 },
        { href: 'missing-img' },
        {
          href: 'https://b.test',
          img: 'https://b.test/b.svg',
          alt: 'B',
        },
      ]),
      warn,
    );
    expect(badges).toHaveLength(2);
    expect(badges[0]?.width).toBe(100);
    expect(badges[1]?.height).toBe(DEFAULT_BADGE_HEIGHT);
    expect(warn).toHaveBeenCalled();
  });
});

describe('resolveDirectoryBadges', () => {
  it('falls back to Fazier when PUBLIC_DIRECTORY_BADGES is unset', () => {
    expect(
      resolveDirectoryBadges({ jsonEnv: '', fazierEnabled: true }),
    ).toEqual([FAZIER_BADGE]);
  });

  it('hides Fazier fallback when PUBLIC_FAZIER_BADGE_ENABLED is off', () => {
    expect(
      resolveDirectoryBadges({ jsonEnv: '  ', fazierEnabled: false }),
    ).toEqual([]);
  });

  it('uses JSON when set and ignores the Fazier toggle', () => {
    const badges = resolveDirectoryBadges({
      jsonEnv: FAZIER_DIRECTORY_BADGES_JSON,
      fazierEnabled: false,
    });
    expect(badges).toHaveLength(1);
    expect(badges[0]?.href).toBe('https://fazier.com');
    expect(badges[0]?.imgDark).toBeUndefined();
    expect(badges[0]?.width).toBe(182);
  });

  it('keeps featured badges and strips launching-soon entries from env JSON', () => {
    const warn = vi.fn();
    const badges = resolveDirectoryBadges({
      jsonEnv: JSON.stringify([
        {
          href: 'https://fazier.com',
          img: 'https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light',
          alt: 'Fazier badge',
          width: 182,
          height: 43,
        },
        {
          href: 'https://tinylaunch.com',
          img: 'https://tinylaunch.com/tinylaunch_badge_launching_soon.svg',
          alt: 'TinyLaunch Badge',
          width: 202,
          height: 48,
          rel: 'noopener',
        },
      ]),
      fazierEnabled: false,
      warn,
    });
    expect(badges).toHaveLength(1);
    expect(badges[0]?.href).toBe('https://fazier.com');
    expect(warn).toHaveBeenCalled();
  });

  it('renders none on invalid JSON even when Fazier fallback would be on', () => {
    const warn = vi.fn();
    expect(
      resolveDirectoryBadges({
        jsonEnv: 'nope',
        fazierEnabled: true,
        warn,
      }),
    ).toEqual([]);
    expect(warn).toHaveBeenCalled();
  });
});
