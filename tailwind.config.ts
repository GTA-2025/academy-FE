import tailwindcssAnimate from "tailwindcss-animate";
import daisyui from "daisyui";
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: 'true',
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '4rem',
        '2xl': '6rem'
      },
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      keyframes: {
        slideDown: {
          '0%': {
            transform: 'translateY(-100%)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        },
        fadeIn: {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        }
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out'
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        fontFamily: {
          latoRegular: [
            'var(--font-lato-regular)',
            'sans-serif'
          ],
          latoBold: [
            'var(--font-lato-bold)',
            'sans-serif'
          ],
          latoBlack: [
            'var(--font-lato-black)',
            'sans-serif'
          ],
          latoHeavy: [
            'var(--font-lato-heavy)',
            'sans-serif'
          ],
          latoLight: [
            'var(--font-lato-light)',
            'sans-serif'
          ],
          latoMedium: [
            'var(--font-lato-medium)',
            'sans-serif'
          ],
          latoSemibold: [
            'var(--font-lato-semibold)',
            'sans-serif'
          ],
          latoThin: [
            'var(--font-lato-thin)',
            'sans-serif'
          ]
        },
        initialPrimary: {
          '100': '#F5F8FF',
          '200': '#EBF4FF',
          '300': '#C3D9FF',
          '400': '#9BBFFF',
          '500': '#2563EB',
          '600': '#6A85E6',
          '700': '#475A99',
          '800': '#364573',
          '900': '#242B4D'
        },
        initialSecondary: {
          '100': '#F8F8F8',
          '200': '#F1F1F1',
          '300': '#D9D9D9',
          '400': '#C2C2C2',
          '500': '#AAAAAA',
          '600': '#999999',
          '700': '#666666',
          '800': '#4D4D4D',
          '900': '#0a0a0a'
        },
        success: {
          '100': '#F0FFF4',
          '200': '#C6F6D5',
          '300': '#9AE6B4',
          '400': '#68D391',
          '500': '#38A169',
          '600': '#2F855A',
          '700': '#15803d',
          '800': '#22543D',
          '900': '#1C4532'
        },
        danger: {
          '100': '#FFF5F5',
          '200': '#FED7D7',
          '300': '#FEB2B2',
          '400': '#FC8181',
          '500': '#F56565',
          '600': '#E53E3E',
          '700': '#C53030',
          '800': '#9B2C2C',
          '900': '#742A2A'
        },
        warning: {
          '100': '#FFFBEB',
          '200': '#FEF3C7',
          '300': '#FDE68A',
          '400': '#FACC15',
          '500': '#EAB308',
          '600': '#CA8A04',
          '700': '#A16207',
          '800': '#854D0E',
          '900': '#713F12'
        },
        general: {
          '100': '#FFFFFF',
          '200': '#858585',
          '300': '#EEEEEE',
          '400': '#0CC25F',
          '500': '#F6F8FA',
          '600': '#E6F3FF',
          '700': '#EBEBEB',
          '800': '#ADADAD'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },

      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px'
      },
      screens: {
        xs: '480px',
        ss: '620px',
        sm: '768px',
        bt: '800px',
        md: '1050px',
        mdd: '1100px',
        lg: '1200px',
        xl: '1440px',
        xll: '2553px'
      },
      textShadow: {
        light: '4px 4px 0px rgba(0, 0, 0, 0.15)',
        dark: '4px 4px 0px rgba(255, 255, 255, 0.15)'
      },
      borderRadius: {
        full: '9999px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    },
    typography: {
      DEFAULT: {
        css: {
          h1: {
            fontSize: '2rem',
            fontWeight: '700',
            lineHeight: '2.5rem'
          },
          h2: {
            fontSize: '1.75rem',
            fontWeight: '600',
            lineHeight: '2.25rem'
          },
          p: {
            fontSize: '1rem',
            lineHeight: '1.75rem'
          },
          a: {
            color: 'hsl(var(--primary))',
            textDecoration: 'underline',
            '&:hover': {
              color: 'hsl(var(--primary-foreground))'
            }
          }
        }
      }
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)'
    },
    keyframes: {
      'accordion-down': {
        from: {
          height: '0'
        },
        to: {
          height: 'var(--radix-accordion-content-height)'
        }
      },
      'accordion-up': {
        from: {
          height: 'var(--radix-accordion-content-height)'
        },
        to: {
          height: '0'
        }
      }
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out'
    }
  },
  plugins: [
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        ".text-shadow-light": {
          textShadow: "4px 4px 0px rgba(0, 0, 0, 0.15)",
        },
        ".dark .text-shadow-light": {
          textShadow: "4px 4px 0px rgba(255, 255, 255, 0.15)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    tailwindcssAnimate,

    daisyui,
  ],
  daisyui: {
    themes: false, // Disables all DaisyUI themes
    base: false, // Prevents base styles from loading
    utils: true, // Keeps utility classes enabled
    logs: false, // Suppresses DaisyUI logs in the console
    rtl: false, // Disables RTL support if not needed
    prefix: "", // No prefix for DaisyUI classes
  },
};

export default config;
