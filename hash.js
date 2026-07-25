const bcrypt = require('bcrypt');

bcrypt.hash('123456', 10).then(h => {
  const sql = `INSERT INTO "Admin" ("id", "email", "password", "role", "name", "updatedAt") 
VALUES (gen_random_uuid(), 'mdnaseef2004@gmail.com', '${h}', 'SUPER_ADMIN', 'Super Admin', NOW());`;
  console.log(sql);
});
