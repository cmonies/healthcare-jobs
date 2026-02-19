import { useControls, folder, Leva, button } from 'leva';
import { useEffect, useState } from 'react';

const LIGHT_DEFAULTS = {
  background: '#FAF7F0',
  textPrimary: '#08090A',
  textSecondary: '#71717A',
  headerBg: '#FFFFFF',
  headerBorder: '#F5F5F4',
  footerBg: '#FFFFFF',
  brandPrimary: '#244BF8',
  brandHover: '#1C3CD6',
  brandLight: '#D9DEFE',
  tableBg: '#FFFFFF',
  tableRowBorder: '#F5F5F4',
  tableRowHover: '#EEF0FE',
  newsletterBg: '#244BF8',
  newsletterText: '#FFFFFF',
};

const DARK_DEFAULTS = {
  background: '#0F0F0F',
  textPrimary: '#F5F5F4',
  textSecondary: '#A1A1AA',
  headerBg: '#161718',
  headerBorder: '#232326',
  footerBg: '#0C0D0D',
  brandPrimary: '#5872FA',
  brandHover: '#244BF8',
  brandLight: '#090D20',
  tableBg: '#161718',
  tableRowBorder: '#232326',
  tableRowHover: '#090D20',
  newsletterBg: '#161718',
  newsletterText: '#FFFFFF',
};

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const check = () => setDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

export default function ColorController() {
  const isDark = useDarkMode();
  const defaults = isDark ? DARK_DEFAULTS : LIGHT_DEFAULTS;

  const [colors, set] = useControls(() => ({
    'Page': folder({
      background: { value: defaults.background, label: 'Background' },
      textPrimary: { value: defaults.textPrimary, label: 'Text Primary' },
      textSecondary: { value: defaults.textSecondary, label: 'Text Secondary' },
    }),
    'Header': folder({
      headerBg: { value: defaults.headerBg, label: 'Background' },
      headerBorder: { value: defaults.headerBorder, label: 'Border' },
    }),
    'Footer': folder({
      footerBg: { value: defaults.footerBg, label: 'Background' },
    }),
    'Brand / Accent': folder({
      brandPrimary: { value: defaults.brandPrimary, label: 'Primary' },
      brandHover: { value: defaults.brandHover, label: 'Hover' },
      brandLight: { value: defaults.brandLight, label: 'Light / Hover Row' },
    }),
    'Job Table': folder({
      tableBg: { value: defaults.tableBg, label: 'Card Background' },
      tableRowBorder: { value: defaults.tableRowBorder, label: 'Row Divider' },
      tableRowHover: { value: defaults.tableRowHover, label: 'Row Hover' },
    }),
    'Newsletter CTA': folder({
      newsletterBg: { value: defaults.newsletterBg, label: 'Background' },
      newsletterText: { value: defaults.newsletterText, label: 'Text' },
    }),
    'Reset to defaults': button(() => {
      const d = document.documentElement.classList.contains('dark') ? DARK_DEFAULTS : LIGHT_DEFAULTS;
      set(d);
    }),
  }), [isDark]);

  // Reset values when dark mode toggles
  useEffect(() => {
    set(defaults);
  }, [isDark]);

  useEffect(() => {
    const root = document.documentElement;
    document.body.style.backgroundColor = colors.background;
    root.style.setProperty('--cc-text-primary', colors.textPrimary);
    root.style.setProperty('--cc-text-secondary', colors.textSecondary);
    root.style.setProperty('--cc-bg', colors.background);
    root.style.setProperty('--cc-header-bg', colors.headerBg);
    root.style.setProperty('--cc-header-border', colors.headerBorder);
    root.style.setProperty('--cc-footer-bg', colors.footerBg);
    root.style.setProperty('--cc-brand', colors.brandPrimary);
    root.style.setProperty('--cc-brand-hover', colors.brandHover);
    root.style.setProperty('--cc-brand-light', colors.brandLight);
    root.style.setProperty('--cc-table-bg', colors.tableBg);
    root.style.setProperty('--cc-table-border', colors.tableRowBorder);
    root.style.setProperty('--cc-table-row-hover', colors.tableRowHover);
    root.style.setProperty('--cc-newsletter-bg', colors.newsletterBg);
    root.style.setProperty('--cc-newsletter-text', colors.newsletterText);
  }, [colors]);

  return <Leva collapsed={false} titleBar={{ title: '🎨 Color Theme' }} />;
}
