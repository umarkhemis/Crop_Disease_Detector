

import React from "react";
import { MenuItem, Select, InputLabel, FormControl, Box } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", label: "English" },
    { code: "lg", label: "Luganda" },
    { code: "rn", label: "Runyankole" },
    { code: "lgbr", label: "Lugbara" },
    { code: "lgch", label: "Acholi" },
    { code: "lango", label: "Lango" },
    { code: "ateso", label: "Ateso" },
  ];

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <LanguageIcon fontSize="small" />
      <FormControl size="small">
        <Select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          displayEmpty
        >
          <MenuItem disabled value="">Language</MenuItem>
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;



















// import React from "react";
// import { MenuItem, Select, InputLabel, FormControl, Box } from "@mui/material";
// import LanguageIcon from "@mui/icons-material/Language";
// import { useTranslation } from "react-i18next";

// const LanguageSelector = () => {
//   const { i18n } = useTranslation();

//   const languages = [
//     { code: "en", label: "English" },
//     { code: "lg", label: "Luganda" },
//     { code: "rn", label: "Runyankole" },
//     { code: "lgbr", label: "Lugbara" },
//     { code: "lgch", label: "Acholi" },
//     { code: "lango", label: "Lango" },
//     { code: "ateso", label: "Ateso" },
//   ];

// //   return (
    
    
// //         <Select
// //           value={i18n.language || ""}
// //           onChange={(e) => i18n.changeLanguage(e.target.value)}
// //           displayEmpty
          
// //         >
// //           <MenuItem disabled value="">
// //             Language
// //           </MenuItem>
// //           {languages.map((lang) => (
// //             <MenuItem key={lang.code} value={lang.code}>
// //               {lang.label}
// //             </MenuItem>
// //           ))}
// //         </Select>
       
// //   );
//   return (
    
//     //  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    
//     //   <LanguageIcon fontSize="small" />
//       <FormControl size="small" sx={{ minWidth: 120 }}>
//         {/* <LanguageIcon fontSize="small" /> */}
//         <Select
//           value={i18n.language || ""}
//           onChange={(e) => i18n.changeLanguage(e.target.value)}
//         //   value={i18n.language}
//         //    onChange={(e) => i18n.changeLanguage(e.target.value)}
//           displayEmpty
//         >
//           <MenuItem disabled value="">
//             Language
//           </MenuItem>
//           {languages.map((lang) => (
//             <MenuItem key={lang.code} value={lang.code}>
//               {lang.label}
//             </MenuItem>
//           ))}
//         </Select>
//        </FormControl>
//     //  </Box>
//   );
  
// };

// export default LanguageSelector;
























// import React from "react";
// // import { Box, MenuItem, Select } from "@mui/material";
// import { MenuItem, Select, InputLabel, FormControl, Box } from "@mui/material";
// import { useTranslation } from "react-i18next";

// const LanguageSelector = () => {
//   const { i18n } = useTranslation();

//   const languages = [
//     { code: "en", label: "English" },
//     { code: "lg", label: "Luganda" },
//     { code: "rn", label: "Runyankole" },
//     { code: "lgbr", label: "Lugbara" },
//     { code: "lgch", label: "Acholi" },
//     { code: "lango", label: "Lango" },
//     { code: "ateso", label: "Ateso" },
//   ];

//   return (
//     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         <FormControl size="small" sx={{ minWidth: 120 }}>
//             <Select
//             defaultChecked="Language"
//             value={i18n.language}
//             onChange={(e) => i18n.changeLanguage(e.target.value)}
//             fullWidth
//             size="small"
//             >
//             {languages.map((lang) => (
//                 <MenuItem key={lang.code} value={lang.code}>
//                 {lang.label}
//                 </MenuItem>
//             ))}
//             </Select>
//         </FormControl>
//     </Box>
//   );
// };

// export default LanguageSelector;





















// import React from "react";
// import { Button, Stack } from "@mui/material";
// import { useTranslation } from "react-i18next";

// const LanguageSelector = () => {
//   const { i18n } = useTranslation();

//   const languages = [
//     { code: "en", label: "🇬🇧 English" },
//     { code: "lg", label: "🇺🇬 Luganda" },
//     { code: "rn", label: "🏞️ Runyankole" },
//     { code: "lgbr", label: "🌿 Lugbara" },
//     { code: "lgch", label: "🕊️ Acholi" },
//     { code: "lango", label: "🐄 Lango" },
//     { code: "ateso", label: "🌾 Ateso" },
//   ];

//   return (
//     <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
//       {languages.map((lang) => (
//         <Button
//           key={lang.code}
//           variant={i18n.language === lang.code ? "contained" : "outlined"}
//           onClick={() => i18n.changeLanguage(lang.code)}
//         >
//           {lang.label}
//         </Button>
//       ))}
//     </Stack>
//   );
// };

// export default LanguageSelector;
