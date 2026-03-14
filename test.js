const fs = require('fs');
let content = fs.readFileSync('c:/grivex-site 3.0/components/Catalog/Footer.tsx', 'utf8');
content = content.replace("</div>\n        </div>\n        </div >\n    );\n};\n", "</div>\n        </div>\n    );\n};\n");
fs.writeFileSync('c:/grivex-site 3.0/components/Catalog/Footer.tsx', content, 'utf8');
