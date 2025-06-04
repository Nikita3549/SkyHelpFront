import React, { useEffect, useState } from 'react';
import { Check, ChevronDown, Phone, Search } from 'lucide-react';
import { countries, CountryOption } from '@/lib/countries';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Add dial codes to countries
const countriesWithDialCodes: (CountryOption & { dialCode: string })[] = [
  { label: 'Afghanistan', value: 'AF', flag: '🇦🇫', dialCode: '+93' },
  { label: 'Albania', value: 'AL', flag: '🇦🇱', dialCode: '+355' },
  { label: 'Algeria', value: 'DZ', flag: '🇩🇿', dialCode: '+213' },
  { label: 'Andorra', value: 'AD', flag: '🇦🇩', dialCode: '+376' },
  { label: 'Angola', value: 'AO', flag: '🇦🇴', dialCode: '+244' },
  { label: 'Antigua and Barbuda', value: 'AG', flag: '🇦🇬', dialCode: '+1' },
  { label: 'Argentina', value: 'AR', flag: '🇦🇷', dialCode: '+54' },
  { label: 'Armenia', value: 'AM', flag: '🇦🇲', dialCode: '+374' },
  { label: 'Australia', value: 'AU', flag: '🇦🇺', dialCode: '+61' },
  { label: 'Austria', value: 'AT', flag: '🇦🇹', dialCode: '+43' },
  { label: 'Azerbaijan', value: 'AZ', flag: '🇦🇿', dialCode: '+994' },
  { label: 'Bahamas', value: 'BS', flag: '🇧🇸', dialCode: '+1' },
  { label: 'Bahrain', value: 'BH', flag: '🇧🇭', dialCode: '+973' },
  { label: 'Bangladesh', value: 'BD', flag: '🇧🇩', dialCode: '+880' },
  { label: 'Barbados', value: 'BB', flag: '🇧🇧', dialCode: '+1' },
  { label: 'Belarus', value: 'BY', flag: '🇧🇾', dialCode: '+375' },
  { label: 'Belgium', value: 'BE', flag: '🇧🇪', dialCode: '+32' },
  { label: 'Belize', value: 'BZ', flag: '🇧🇿', dialCode: '+501' },
  { label: 'Benin', value: 'BJ', flag: '🇧🇯', dialCode: '+229' },
  { label: 'Bhutan', value: 'BT', flag: '🇧🇹', dialCode: '+975' },
  { label: 'Bolivia', value: 'BO', flag: '🇧🇴', dialCode: '+591' },
  {
    label: 'Bosnia and Herzegovina',
    value: 'BA',
    flag: '🇧🇦',
    dialCode: '+387',
  },
  { label: 'Botswana', value: 'BW', flag: '🇧🇼', dialCode: '+267' },
  { label: 'Brazil', value: 'BR', flag: '🇧🇷', dialCode: '+55' },
  { label: 'Brunei', value: 'BN', flag: '🇧🇳', dialCode: '+673' },
  { label: 'Bulgaria', value: 'BG', flag: '🇧🇬', dialCode: '+359' },
  { label: 'Burkina Faso', value: 'BF', flag: '🇧🇫', dialCode: '+226' },
  { label: 'Burundi', value: 'BI', flag: '🇧🇮', dialCode: '+257' },
  { label: 'Cabo Verde', value: 'CV', flag: '🇨🇻', dialCode: '+238' },
  { label: 'Cambodia', value: 'KH', flag: '🇰🇭', dialCode: '+855' },
  { label: 'Cameroon', value: 'CM', flag: '🇨🇲', dialCode: '+237' },
  { label: 'Canada', value: 'CA', flag: '🇨🇦', dialCode: '+1' },
  {
    label: 'Central African Republic',
    value: 'CF',
    flag: '🇨🇫',
    dialCode: '+236',
  },
  { label: 'Chad', value: 'TD', flag: '🇹🇩', dialCode: '+235' },
  { label: 'Chile', value: 'CL', flag: '🇨🇱', dialCode: '+56' },
  { label: 'China', value: 'CN', flag: '🇨🇳', dialCode: '+86' },
  { label: 'Colombia', value: 'CO', flag: '🇨🇴', dialCode: '+57' },
  { label: 'Comoros', value: 'KM', flag: '🇰🇲', dialCode: '+269' },
  { label: 'Congo', value: 'CG', flag: '🇨🇬', dialCode: '+242' },
  { label: 'Costa Rica', value: 'CR', flag: '🇨🇷', dialCode: '+506' },
  { label: 'Croatia', value: 'HR', flag: '🇭🇷', dialCode: '+385' },
  { label: 'Cuba', value: 'CU', flag: '🇨🇺', dialCode: '+53' },
  { label: 'Cyprus', value: 'CY', flag: '🇨🇾', dialCode: '+357' },
  { label: 'Czech Republic', value: 'CZ', flag: '🇨🇿', dialCode: '+420' },
  { label: 'Denmark', value: 'DK', flag: '🇩🇰', dialCode: '+45' },
  { label: 'Djibouti', value: 'DJ', flag: '🇩🇯', dialCode: '+253' },
  { label: 'Dominica', value: 'DM', flag: '🇩🇲', dialCode: '+1' },
  { label: 'Dominican Republic', value: 'DO', flag: '🇩🇴', dialCode: '+1' },
  { label: 'Ecuador', value: 'EC', flag: '🇪🇨', dialCode: '+593' },
  { label: 'Egypt', value: 'EG', flag: '🇪🇬', dialCode: '+20' },
  { label: 'El Salvador', value: 'SV', flag: '🇸🇻', dialCode: '+503' },
  { label: 'Equatorial Guinea', value: 'GQ', flag: '🇬🇶', dialCode: '+240' },
  { label: 'Eritrea', value: 'ER', flag: '🇪🇷', dialCode: '+291' },
  { label: 'Estonia', value: 'EE', flag: '🇪🇪', dialCode: '+372' },
  { label: 'Eswatini', value: 'SZ', flag: '🇸🇿', dialCode: '+268' },
  { label: 'Ethiopia', value: 'ET', flag: '🇪🇹', dialCode: '+251' },
  { label: 'Fiji', value: 'FJ', flag: '🇫🇯', dialCode: '+679' },
  { label: 'Finland', value: 'FI', flag: '🇫🇮', dialCode: '+358' },
  { label: 'France', value: 'FR', flag: '🇫🇷', dialCode: '+33' },
  { label: 'Gabon', value: 'GA', flag: '🇬🇦', dialCode: '+241' },
  { label: 'Gambia', value: 'GM', flag: '🇬🇲', dialCode: '+220' },
  { label: 'Georgia', value: 'GE', flag: '🇬🇪', dialCode: '+995' },
  { label: 'Germany', value: 'DE', flag: '🇩🇪', dialCode: '+49' },
  { label: 'Ghana', value: 'GH', flag: '🇬🇭', dialCode: '+233' },
  { label: 'Greece', value: 'GR', flag: '🇬🇷', dialCode: '+30' },
  { label: 'Grenada', value: 'GD', flag: '🇬🇩', dialCode: '+1' },
  { label: 'Guatemala', value: 'GT', flag: '🇬🇹', dialCode: '+502' },
  { label: 'Guinea', value: 'GN', flag: '🇬🇳', dialCode: '+224' },
  { label: 'Guinea-Bissau', value: 'GW', flag: '🇬🇼', dialCode: '+245' },
  { label: 'Guyana', value: 'GY', flag: '🇬🇾', dialCode: '+592' },
  { label: 'Haiti', value: 'HT', flag: '🇭🇹', dialCode: '+509' },
  { label: 'Honduras', value: 'HN', flag: '🇭🇳', dialCode: '+504' },
  { label: 'Hungary', value: 'HU', flag: '🇭🇺', dialCode: '+36' },
  { label: 'Iceland', value: 'IS', flag: '🇮🇸', dialCode: '+354' },
  { label: 'India', value: 'IN', flag: '🇮🇳', dialCode: '+91' },
  { label: 'Indonesia', value: 'ID', flag: '🇮🇩', dialCode: '+62' },
  { label: 'Iran', value: 'IR', flag: '🇮🇷', dialCode: '+98' },
  { label: 'Iraq', value: 'IQ', flag: '🇮🇶', dialCode: '+964' },
  { label: 'Ireland', value: 'IE', flag: '🇮🇪', dialCode: '+353' },
  { label: 'Israel', value: 'IL', flag: '🇮🇱', dialCode: '+972' },
  { label: 'Italy', value: 'IT', flag: '🇮🇹', dialCode: '+39' },
  { label: 'Jamaica', value: 'JM', flag: '🇯🇲', dialCode: '+1' },
  { label: 'Japan', value: 'JP', flag: '🇯🇵', dialCode: '+81' },
  { label: 'Jordan', value: 'JO', flag: '🇯🇴', dialCode: '+962' },
  { label: 'Kazakhstan', value: 'KZ', flag: '🇰🇿', dialCode: '+7' },
  { label: 'Kenya', value: 'KE', flag: '🇰🇪', dialCode: '+254' },
  { label: 'Kiribati', value: 'KI', flag: '🇰🇮', dialCode: '+686' },
  { label: 'Korea, North', value: 'KP', flag: '🇰🇵', dialCode: '+850' },
  { label: 'Korea, South', value: 'KR', flag: '🇰🇷', dialCode: '+82' },
  { label: 'Kuwait', value: 'KW', flag: '🇰🇼', dialCode: '+965' },
  { label: 'Kyrgyzstan', value: 'KG', flag: '🇰🇬', dialCode: '+996' },
  { label: 'Laos', value: 'LA', flag: '🇱🇦', dialCode: '+856' },
  { label: 'Latvia', value: 'LV', flag: '🇱🇻', dialCode: '+371' },
  { label: 'Lebanon', value: 'LB', flag: '🇱🇧', dialCode: '+961' },
  { label: 'Lesotho', value: 'LS', flag: '🇱🇸', dialCode: '+266' },
  { label: 'Liberia', value: 'LR', flag: '🇱🇷', dialCode: '+231' },
  { label: 'Libya', value: 'LY', flag: '🇱🇾', dialCode: '+218' },
  { label: 'Liechtenstein', value: 'LI', flag: '🇱🇮', dialCode: '+423' },
  { label: 'Lithuania', value: 'LT', flag: '🇱🇹', dialCode: '+370' },
  { label: 'Luxembourg', value: 'LU', flag: '🇱🇺', dialCode: '+352' },
  { label: 'Madagascar', value: 'MG', flag: '🇲🇬', dialCode: '+261' },
  { label: 'Malawi', value: 'MW', flag: '🇲🇼', dialCode: '+265' },
  { label: 'Malaysia', value: 'MY', flag: '🇲🇾', dialCode: '+60' },
  { label: 'Maldives', value: 'MV', flag: '🇲🇻', dialCode: '+960' },
  { label: 'Mali', value: 'ML', flag: '🇲🇱', dialCode: '+223' },
  { label: 'Malta', value: 'MT', flag: '🇲🇹', dialCode: '+356' },
  { label: 'Marshall Islands', value: 'MH', flag: '🇲🇭', dialCode: '+692' },
  { label: 'Mauritania', value: 'MR', flag: '🇲🇷', dialCode: '+222' },
  { label: 'Mauritius', value: 'MU', flag: '🇲🇺', dialCode: '+230' },
  { label: 'Mexico', value: 'MX', flag: '🇲🇽', dialCode: '+52' },
  { label: 'Micronesia', value: 'FM', flag: '🇫🇲', dialCode: '+691' },
  { label: 'Moldova', value: 'MD', flag: '🇲🇩', dialCode: '+373' },
  { label: 'Monaco', value: 'MC', flag: '🇲🇨', dialCode: '+377' },
  { label: 'Mongolia', value: 'MN', flag: '🇲🇳', dialCode: '+976' },
  { label: 'Montenegro', value: 'ME', flag: '🇲🇪', dialCode: '+382' },
  { label: 'Morocco', value: 'MA', flag: '🇲🇦', dialCode: '+212' },
  { label: 'Mozambique', value: 'MZ', flag: '🇲🇿', dialCode: '+258' },
  { label: 'Myanmar', value: 'MM', flag: '🇲🇲', dialCode: '+95' },
  { label: 'Namibia', value: 'NA', flag: '🇳🇦', dialCode: '+264' },
  { label: 'Nauru', value: 'NR', flag: '🇳🇷', dialCode: '+674' },
  { label: 'Nepal', value: 'NP', flag: '🇳🇵', dialCode: '+977' },
  { label: 'Netherlands', value: 'NL', flag: '🇳🇱', dialCode: '+31' },
  { label: 'New Zealand', value: 'NZ', flag: '🇳🇿', dialCode: '+64' },
  { label: 'Nicaragua', value: 'NI', flag: '🇳🇮', dialCode: '+505' },
  { label: 'Niger', value: 'NE', flag: '🇳🇪', dialCode: '+227' },
  { label: 'Nigeria', value: 'NG', flag: '🇳🇬', dialCode: '+234' },
  { label: 'North Macedonia', value: 'MK', flag: '🇲🇰', dialCode: '+389' },
  { label: 'Norway', value: 'NO', flag: '🇳🇴', dialCode: '+47' },
  { label: 'Oman', value: 'OM', flag: '🇴🇲', dialCode: '+968' },
  { label: 'Pakistan', value: 'PK', flag: '🇵🇰', dialCode: '+92' },
  { label: 'Palau', value: 'PW', flag: '🇵🇼', dialCode: '+680' },
  { label: 'Palestine', value: 'PS', flag: '🇵🇸', dialCode: '+970' },
  { label: 'Panama', value: 'PA', flag: '🇵🇦', dialCode: '+507' },
  { label: 'Papua New Guinea', value: 'PG', flag: '🇵🇬', dialCode: '+675' },
  { label: 'Paraguay', value: 'PY', flag: '🇵🇾', dialCode: '+595' },
  { label: 'Peru', value: 'PE', flag: '🇵🇪', dialCode: '+51' },
  { label: 'Philippines', value: 'PH', flag: '🇵🇭', dialCode: '+63' },
  { label: 'Poland', value: 'PL', flag: '🇵🇱', dialCode: '+48' },
  { label: 'Portugal', value: 'PT', flag: '🇵🇹', dialCode: '+351' },
  { label: 'Qatar', value: 'QA', flag: '🇶🇦', dialCode: '+974' },
  { label: 'Romania', value: 'RO', flag: '🇷🇴', dialCode: '+40' },
  { label: 'Russia', value: 'RU', flag: '🇷🇺', dialCode: '+7' },
  { label: 'Rwanda', value: 'RW', flag: '🇷🇼', dialCode: '+250' },
  { label: 'Saint Kitts and Nevis', value: 'KN', flag: '🇰🇳', dialCode: '+1' },
  { label: 'Saint Lucia', value: 'LC', flag: '🇱🇨', dialCode: '+1' },
  {
    label: 'Saint Vincent and the Grenadines',
    value: 'VC',
    flag: '🇻🇨',
    dialCode: '+1',
  },
  { label: 'Samoa', value: 'WS', flag: '🇼🇸', dialCode: '+685' },
  { label: 'San Marino', value: 'SM', flag: '🇸🇲', dialCode: '+378' },
  { label: 'Sao Tome and Principe', value: 'ST', flag: '🇸🇹', dialCode: '+239' },
  { label: 'Saudi Arabia', value: 'SA', flag: '🇸🇦', dialCode: '+966' },
  { label: 'Senegal', value: 'SN', flag: '🇸🇳', dialCode: '+221' },
  { label: 'Serbia', value: 'RS', flag: '🇷🇸', dialCode: '+381' },
  { label: 'Seychelles', value: 'SC', flag: '🇸🇨', dialCode: '+248' },
  { label: 'Sierra Leone', value: 'SL', flag: '🇸🇱', dialCode: '+232' },
  { label: 'Singapore', value: 'SG', flag: '🇸🇬', dialCode: '+65' },
  { label: 'Slovakia', value: 'SK', flag: '🇸🇰', dialCode: '+421' },
  { label: 'Slovenia', value: 'SI', flag: '🇸🇮', dialCode: '+386' },
  { label: 'Solomon Islands', value: 'SB', flag: '🇸🇧', dialCode: '+677' },
  { label: 'Somalia', value: 'SO', flag: '🇸🇴', dialCode: '+252' },
  { label: 'South Africa', value: 'ZA', flag: '🇿🇦', dialCode: '+27' },
  { label: 'South Sudan', value: 'SS', flag: '🇸🇸', dialCode: '+211' },
  { label: 'Spain', value: 'ES', flag: '🇪🇸', dialCode: '+34' },
  { label: 'Sri Lanka', value: 'LK', flag: '🇱🇰', dialCode: '+94' },
  { label: 'Sudan', value: 'SD', flag: '🇸🇩', dialCode: '+249' },
  { label: 'Suriname', value: 'SR', flag: '🇸🇷', dialCode: '+597' },
  { label: 'Sweden', value: 'SE', flag: '🇸🇪', dialCode: '+46' },
  { label: 'Switzerland', value: 'CH', flag: '🇨🇭', dialCode: '+41' },
  { label: 'Syria', value: 'SY', flag: '🇸🇾', dialCode: '+963' },
  { label: 'Taiwan', value: 'TW', flag: '🇹🇼', dialCode: '+886' },
  { label: 'Tajikistan', value: 'TJ', flag: '🇹🇯', dialCode: '+992' },
  { label: 'Tanzania', value: 'TZ', flag: '🇹🇿', dialCode: '+255' },
  { label: 'Thailand', value: 'TH', flag: '🇹🇭', dialCode: '+66' },
  { label: 'Timor-Leste', value: 'TL', flag: '🇹🇱', dialCode: '+670' },
  { label: 'Togo', value: 'TG', flag: '🇹🇬', dialCode: '+228' },
  { label: 'Tonga', value: 'TO', flag: '🇹🇴', dialCode: '+676' },
  { label: 'Trinidad and Tobago', value: 'TT', flag: '🇹🇹', dialCode: '+1' },
  { label: 'Tunisia', value: 'TN', flag: '🇹🇳', dialCode: '+216' },
  { label: 'Turkey', value: 'TR', flag: '🇹🇷', dialCode: '+90' },
  { label: 'Turkmenistan', value: 'TM', flag: '🇹🇲', dialCode: '+993' },
  { label: 'Tuvalu', value: 'TV', flag: '🇹🇻', dialCode: '+688' },
  { label: 'Uganda', value: 'UG', flag: '🇺🇬', dialCode: '+256' },
  { label: 'Ukraine', value: 'UA', flag: '🇺🇦', dialCode: '+380' },
  { label: 'United Arab Emirates', value: 'AE', flag: '🇦🇪', dialCode: '+971' },
  { label: 'United Kingdom', value: 'GB', flag: '🇬🇧', dialCode: '+44' },
  { label: 'United States', value: 'US', flag: '🇺🇸', dialCode: '+1' },
  { label: 'Uruguay', value: 'UY', flag: '🇺🇾', dialCode: '+598' },
  { label: 'Uzbekistan', value: 'UZ', flag: '🇺🇿', dialCode: '+998' },
  { label: 'Vanuatu', value: 'VU', flag: '🇻🇺', dialCode: '+678' },
  { label: 'Vatican City', value: 'VA', flag: '🇻🇦', dialCode: '+39' },
  { label: 'Venezuela', value: 'VE', flag: '🇻🇪', dialCode: '+58' },
  { label: 'Vietnam', value: 'VN', flag: '🇻🇳', dialCode: '+84' },
  { label: 'Yemen', value: 'YE', flag: '🇾🇪', dialCode: '+967' },
  { label: 'Zambia', value: 'ZM', flag: '🇿🇲', dialCode: '+260' },
  { label: 'Zimbabwe', value: 'ZW', flag: '🇿🇼', dialCode: '+263' },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  defaultCountry?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value = '',
  onChange,
  placeholder = 'Enter your phone number',
  defaultCountry = 'US',
}) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<
    (typeof countriesWithDialCodes)[0] | null
  >(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Parse value to extract country code and phone number on component mount or when value changes externally
  useEffect(() => {
    // If we don't have a value yet, set the default country
    if (!value && !selectedCountry) {
      const defaultCountryOption = countriesWithDialCodes.find(
        (c) => c.value === defaultCountry,
      );
      if (defaultCountryOption) {
        setSelectedCountry(defaultCountryOption);
        // Just set the dial code without updating the form value yet
        setPhoneNumber('');
      }
    } else if (value && !selectedCountry) {
      // Try to detect country from the value if it has a + prefix
      if (value.startsWith('+')) {
        // Find the longest matching dial code
        let matchedCountry = null;
        let maxLength = 0;

        for (const country of countriesWithDialCodes) {
          const dialCode = country.dialCode;
          if (value.startsWith(dialCode) && dialCode.length > maxLength) {
            matchedCountry = country;
            maxLength = dialCode.length;
          }
        }

        if (matchedCountry) {
          setSelectedCountry(matchedCountry);
          setPhoneNumber(value.slice(matchedCountry.dialCode.length).trim());
        } else {
          // No match found, just use the default country
          const defaultCountryOption = countriesWithDialCodes.find(
            (c) => c.value === defaultCountry,
          );
          if (defaultCountryOption) {
            setSelectedCountry(defaultCountryOption);
            setPhoneNumber(value);
          }
        }
      } else {
        // If no + prefix, just use the default country and keep the entire value as phone
        const defaultCountryOption = countriesWithDialCodes.find(
          (c) => c.value === defaultCountry,
        );
        if (defaultCountryOption) {
          setSelectedCountry(defaultCountryOption);
          setPhoneNumber(value);
        }
      }
    }
  }, [value, defaultCountry, selectedCountry]);

  // When the user selects a country from the dropdown
  const handleCountrySelect = (country: (typeof countriesWithDialCodes)[0]) => {
    setSelectedCountry(country);
    setOpen(false);

    // Update the form with the new value
    const newValue = `${country.dialCode} ${phoneNumber}`.trim();
    onChange(newValue);
  };

  // When the user types in the phone input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);

    // Only update the form value if we have a selected country
    if (selectedCountry) {
      const newValue = `${selectedCountry.dialCode} ${newPhoneNumber}`.trim();
      onChange(newValue);
    } else {
      onChange(newPhoneNumber);
    }
  };

  return (
    <div className="flex">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              'flex-shrink-0 px-2 md:px-3 border-r-0 rounded-r-none focus-visible:ring-offset-0 border-r-transparent',
              isMobile ? 'h-12 text-base' : 'h-10 text-sm',
            )}
          >
            <div className="flex items-center gap-1 md:gap-2">
              {selectedCountry ? (
                <>
                  <span className="text-base">{selectedCountry.flag}</span>
                  <span className="hidden md:inline">
                    {selectedCountry.dialCode}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </>
              ) : (
                <>
                  <Phone className="h-4 w-4" />
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[240px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countriesWithDialCodes.map((country) => (
                  <CommandItem
                    key={country.value}
                    value={country.label}
                    onSelect={() => handleCountrySelect(country)}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{country.flag}</span>
                      <span className="flex-1 truncate">{country.label}</span>
                      <span className="text-muted-foreground text-xs">
                        {country.dialCode}
                      </span>
                    </div>
                    <Check
                      className={cn(
                        'ml-2 h-4 w-4',
                        selectedCountry?.value === country.value
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        className={cn(
          'rounded-l-none',
          isMobile ? 'h-12 py-3 text-base' : 'h-10 py-2 text-sm',
        )}
        placeholder={placeholder}
      />
    </div>
  );
};

export default PhoneInput;
