import { useControls, folder, Leva } from 'leva';
import { useEffect } from 'react';

export default function ColorController() {
  const colors = useControls({
    'Page': folder({
      background: { value: '#FAF7F0', label: 'Background' },
      textPrimary: { value: '#08090A', label: 'Text Primary' },
      textSecondary: { value: '#71717A', label: 'Text Secondary' },
    }),
    'Header': folder({
      headerBg: { value: '#FFFFFF', label: 'Background' },
      headerBorder: { value: '#F5F5F4', label: 'Border' },
    }),
    'Footer': folder({
      footerBg: { value: '#FFFFFF', label: 'Background' },
    }),
    'Brand / Accent': folder({
      brandPrimary: { value: '#244BF8', label: 'Primary' },
      brandHover: { value: '#1C3CD6', label: 'Hover' },
      brandLight: { value: '#EEF0FE', label: 'Light / Hover Row' },
    }),
    'Job Table': folder({
      tableBg: { value: '#FFFFFF', label: 'Card Background' },
      tableRowBorder: { value: '#F5F5F4', label: 'Row Divider' },
      tableRowHover: { value: '#D9DEFE', label: 'Row Hover' },
    }),
    'Newsletter CTA': folder({
      newsletterBg: { value: '#244BF8', label: 'Background' },
      newsletterText: { value: '#FFFFFF', label: 'Text' },
    }),
  });

  useEffect(() => {
    const root = document.documentElement;
    // Page
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
