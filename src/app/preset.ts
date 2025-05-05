import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const preset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{yellow.50}',
      100: '{yellow.100}',
      200: '{yellow.200}',
      300: '{yellow.300}',
      400: '{yellow.400}',
      500: '{yellow.600}',
      600: '{yellow.700}',
      700: '{yellow.800}',
      800: '{yellow.900}',
      900: '{yellow.950}',
      950: '{yellow.950}',
    },
  },
});
