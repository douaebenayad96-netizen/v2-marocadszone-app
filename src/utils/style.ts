import { Props } from "react-select";

export const SelectStyles: Props = {
  theme: (theme) => ({
    ...theme,
    borderRadius: 12,
    colors: {
      ...theme.colors,
      primary25: '#FEF3F2', // Light orange hover
      primary50: '#FED7D3', // Medium orange
      primary75: '#FC8C65', // Darker orange
      primary: '#EA580C', // Orange primary color
      neutral20: '#E5E7EB', // Border
      neutral30: '#D1D5DB', // Border hover
      neutral80: '#374151', // Text color
    },
  }),

  styles: {
    control: (base, state) => ({
      ...base,
      minHeight: '48px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(234, 88, 12, 0.1)' : 'none',
      borderColor: state.isFocused ? '#EA580C' : '#E5E7EB',
      borderWidth: '2px',
      backgroundColor: '#FAFAFA',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: '#EA580C',
        backgroundColor: '#FFFFFF',
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: '#9CA3AF',
      fontSize: '14px',
      fontWeight: '500',
    }),
    singleValue: (base) => ({
      ...base,
      color: '#111827',
      fontSize: '14px',
      fontWeight: '600',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid #E5E7EB',
      overflow: 'hidden',
      zIndex: 9999,
    }),
    menuList: (base) => ({
      ...base,
      padding: '8px',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#EA580C' 
        : state.isFocused 
        ? '#FEF3F2' 
        : 'transparent',
      color: state.isSelected ? '#FFFFFF' : '#374151',
      borderRadius: '8px',
      margin: '2px 0',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: state.isSelected ? '600' : '500',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      '&:active': {
        backgroundColor: state.isSelected ? '#EA580C' : '#FED7D3',
      },
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? '#EA580C' : '#9CA3AF',
      transition: 'all 0.2s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      '&:hover': {
        color: '#EA580C',
      },
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: '#E5E7EB',
      width: '2px',
    }),
    clearIndicator: (base) => ({
      ...base,
      color: '#9CA3AF',
      '&:hover': {
        color: '#EF4444',
      },
    }),
  },
}

export const handleStylesWithErrors = (isError: boolean) => {
  if (isError) {
    const SelectStyles: Props = {
      theme: (theme) => ({
        ...theme,
        borderRadius: 12,
        colors: {
          ...theme.colors,
          primary25: '#FEF2F2', // Light red hover
          primary50: '#FECACA', // Medium red
          primary75: '#F87171', // Darker red
          primary: '#EF4444', // Red primary color
          neutral20: '#FCA5A5', // Red border
          neutral30: '#F87171', // Red border hover
          neutral80: '#374151', // Text color
        },
      }),
      styles: {
        control: (base, state) => ({
          ...base,
          minHeight: '48px',
          boxShadow: state.isFocused ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none',
          borderColor: '#EF4444',
          borderWidth: '2px',
          backgroundColor: '#FEF2F2',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: '#DC2626',
            backgroundColor: '#FFFFFF',
          },
        }),
        placeholder: (base) => ({
          ...base,
          color: '#B91C1C',
          fontSize: '14px',
          fontWeight: '500',
        }),
        singleValue: (base) => ({
          ...base,
          color: '#111827',
          fontSize: '14px',
          fontWeight: '600',
        }),        menu: (base) => ({
          ...base,
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #FCA5A5',
          overflow: 'hidden',
          zIndex: 9999,
        }),
        menuList: (base) => ({
          ...base,
          padding: '8px',
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected 
            ? '#EF4444' 
            : state.isFocused 
            ? '#FEF2F2' 
            : 'transparent',
          color: state.isSelected ? '#FFFFFF' : '#374151',
          borderRadius: '8px',
          margin: '2px 0',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: state.isSelected ? '600' : '500',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          '&:active': {
            backgroundColor: state.isSelected ? '#EF4444' : '#FECACA',
          },
        }),
        dropdownIndicator: (base, state) => ({
          ...base,
          color: state.isFocused ? '#EF4444' : '#DC2626',
          transition: 'all 0.2s ease',
          transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          '&:hover': {
            color: '#DC2626',
          },
        }),
        indicatorSeparator: (base) => ({
          ...base,
          backgroundColor: '#FCA5A5',
          width: '2px',
        }),
        clearIndicator: (base) => ({
          ...base,
          color: '#DC2626',
          '&:hover': {
            color: '#B91C1C',
          },
        }),
      },
    }
    return SelectStyles
  } else {
    const SelectStyles: Props = {
      theme: (theme) => ({
        ...theme,
        borderRadius: 12,
        colors: {
          ...theme.colors,
          primary25: '#FEF3F2', // Light orange hover
          primary50: '#FED7D3', // Medium orange
          primary75: '#FC8C65', // Darker orange
          primary: '#EA580C', // Orange primary color
          neutral20: '#E5E7EB', // Border
          neutral30: '#D1D5DB', // Border hover
          neutral80: '#374151', // Text color
        },
      }),

      styles: {
        control: (base, state) => ({
          ...base,
          minHeight: '48px',
          boxShadow: state.isFocused ? '0 0 0 3px rgba(234, 88, 12, 0.1)' : 'none',
          borderColor: state.isFocused ? '#EA580C' : '#E5E7EB',
          borderWidth: '2px',
          backgroundColor: '#FAFAFA',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: '#EA580C',
            backgroundColor: '#FFFFFF',
          },
        }),
        placeholder: (base) => ({
          ...base,
          color: '#9CA3AF',
          fontSize: '14px',
          fontWeight: '500',
        }),
        singleValue: (base) => ({
          ...base,
          color: '#111827',
          fontSize: '14px',
          fontWeight: '600',        }),
        menu: (base) => ({
          ...base,
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
          zIndex: 9999,
        }),
        menuList: (base) => ({
          ...base,
          padding: '8px',
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected 
            ? '#EA580C' 
            : state.isFocused 
            ? '#FEF3F2' 
            : 'transparent',
          color: state.isSelected ? '#FFFFFF' : '#374151',
          borderRadius: '8px',
          margin: '2px 0',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: state.isSelected ? '600' : '500',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          '&:active': {
            backgroundColor: state.isSelected ? '#EA580C' : '#FED7D3',
          },
        }),
        dropdownIndicator: (base, state) => ({
          ...base,
          color: state.isFocused ? '#EA580C' : '#9CA3AF',
          transition: 'all 0.2s ease',
          transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          '&:hover': {
            color: '#EA580C',
          },
        }),
        indicatorSeparator: (base) => ({
          ...base,
          backgroundColor: '#E5E7EB',
          width: '2px',
        }),
        clearIndicator: (base) => ({
          ...base,
          color: '#9CA3AF',
          '&:hover': {
            color: '#EF4444',
          },
        }),
      },
    }
    return SelectStyles
  }
}

// Special enhanced styles for category and subcategory dropdowns
export const CategorySelectStyles: Props = {
  theme: (theme) => ({
    ...theme,
    borderRadius: 16,
    colors: {
      ...theme.colors,
      primary25: '#FFF7ED', // Very light orange hover
      primary50: '#FFEDD5', // Light orange
      primary75: '#FED7AA', // Medium orange
      primary: '#EA580C', // Orange primary color
      neutral20: '#F97316', // Orange border
      neutral30: '#EA580C', // Orange border hover
      neutral80: '#1F2937', // Dark text color
    },
  }),

  styles: {
    control: (base, state) => ({
      ...base,
      minHeight: '56px',
      boxShadow: state.isFocused 
        ? '0 0 0 4px rgba(234, 88, 12, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
        : '0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderColor: state.isFocused ? '#EA580C' : '#F97316',
      borderWidth: '2px',
      backgroundColor: state.isFocused ? '#FFFFFF' : '#FFFBEB',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      '&:hover': {
        borderColor: '#EA580C',
        backgroundColor: '#FFFFFF',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: '#D97706',
      fontSize: '15px',
      fontWeight: '600',
      fontFamily: 'Inter, system-ui, sans-serif',
    }),
    singleValue: (base) => ({
      ...base,
      color: '#1F2937',
      fontSize: '15px',
      fontWeight: '700',
      fontFamily: 'Inter, system-ui, sans-serif',
    }),    menu: (base) => ({
      ...base,
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(249, 115, 22, 0.1)',
      border: '2px solid #FED7AA',
      overflow: 'hidden',
      marginTop: '8px',
      zIndex: 99999,
    }),
    menuList: (base) => ({
      ...base,
      padding: '12px',
      maxHeight: '240px',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#EA580C' 
        : state.isFocused 
        ? '#FFF7ED' 
        : 'transparent',
      color: state.isSelected ? '#FFFFFF' : state.isFocused ? '#EA580C' : '#374151',
      borderRadius: '10px',
      margin: '3px 0',
      padding: '14px 18px',
      fontSize: '14px',
      fontWeight: state.isSelected ? '700' : state.isFocused ? '600' : '500',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      '&:active': {
        backgroundColor: state.isSelected ? '#DC2626' : '#FFEDD5',
        transform: 'scale(0.98)',
      },
      '&:before': state.isSelected ? {
        content: '"✓"',
        position: 'absolute',
        right: '18px',
        fontWeight: 'bold',
        fontSize: '16px',
      } : undefined,
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? '#EA580C' : '#F97316',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      '&:hover': {
        color: '#DC2626',
      },
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: '#FED7AA',
      width: '2px',
    }),
    clearIndicator: (base) => ({
      ...base,
      color: '#F97316',
      transition: 'all 0.2s ease',
      '&:hover': {
        color: '#DC2626',
        transform: 'scale(1.1)',
      },
    }),
  },
}