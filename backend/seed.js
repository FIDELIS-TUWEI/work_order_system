const Role = require("./model/roles");

async function seedRoles() {
    try {
        // clear existing roles
        await Role.deleteMany();

        const roles = [
            { name: "admin", permissions: ["create", "read", "update", "delete"] },
            { name: "hod", permissions: ["create", "read", "update"] },
            { name: "user", permissions: ["read"] },
        ];

        await Role.insertMany(roles);
        console.log("Roles seeded succesfully");
    } catch (error) {
        console.log("Error seeding roles", error);
    }
}

seedRoles();
