export const formatLabel = (label: string): string =>
    label
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");