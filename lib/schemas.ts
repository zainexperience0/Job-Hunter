import { nanoid } from "nanoid";

export const prePath = "main";

export const searchTypes = ["email", "name", "phone", "phone"];

export const allModels = [
  {
    name: "Jobs",
    model: "job",
    meta: {
      title: "title",
    },
    updateField: "updatedAt",
    searchConfig: {
      searchFields: ["title"],
      sortBy: "desc",
      sortField: "createdAt",
    },
    fields: [
      {
        name: "Title",
        slug: "title",
        type: "textInput",
        defaultValue: "",
        required: true, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Description",
        slug: "description",
        type: "markdownInput",
        defaultValue: "",
        required: false,
        dataType: "string",
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "create",
          "update",
          "delete",
          "findMany",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Acceptance Criteria",
        slug: "acceptance",
        type: "markdownInput",
        defaultValue: "",
        required: false,
        dataType: "string",
        customClassName: "",
        backend: ["findFirst", "findUnique", "create", "update", "delete"],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Status",
        slug: "status",
        type: "selectInput",
        defaultValue: "OPEN",
        required: false,
        dataType: "string",
        options: ["OPEN", "CLOSED"],
        customClassName: "",
        backend: ["findFirst", "findUnique", "create", "update", "delete"],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "OPEN";
        },
      },
      {
        name: "Bounty",
        slug: "bounty",
        type: "numberInput",
        defaultValue: 0,
        required: false,
        dataType: "string",
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "create",
          "update",
          "delete",
          "findMany",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return 0;
        },
      },
      {
        name: "BountyStatus",
        slug: "bountyActive",
        type: "switchInput",
        defaultValue: false,
        required: false,
        dataType: "string",
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "create",
          "update",
          "delete",
          "findMany",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return false;
        },
      },
      {
        name: "Due Time",
        slug: "due",
        type: "numberInput",
        defaultValue: 0,
        required: false,
        dataType: "string",
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "create",
          "update",
          "delete",
          "findMany",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return 0;
        },
      },
      {
        name: "Minimum Complete Jobs",
        slug: "minCompJobs",
        type: "numberInput",
        defaultValue: 0,
        required: false,
        dataType: "string",
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "create",
          "update",
          "delete",
          "findMany",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return 0;
        },
      },
      {
        name: "Level",
        slug: "level",
        type: "selectInput",
        defaultValue: "BEGINNER",
        required: false,
        dataType: "string",
        options: ["BEGINNER", "INTERMEDIATE", "EXPERT"],
        customClassName: "",
        backend: ["findFirst", "findUnique", "create", "update", "delete"],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "BEGINNER";
        },
      },
      {
        name: "Created At",
        slug: "createdAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst", "findUnique", "findMany"],
        frontend: ["list", "view"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Updated At",
        slug: "updatedAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst", "findUnique", "findMany"],
        frontend: ["list", "view"],
        valueGetter: () => {
          return "";
        },
      },
    ],
  },
  {
    name: "User",
    model: "user",
    meta: {
      title: "username",
    },
    updateField: "updatedAt",
    searchConfig: {
      searchFields: ["email", "username"],
      sortBy: "desc",
      sortField: "createdAt",
    },
    fields: [
      {
        name: "Email",
        slug: "email",
        type: "emailInput",
        defaultValue: "",
        required: true, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "username",
        slug: "username",
        type: "textInput",
        defaultValue: "",
        required: false, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Password",
        slug: "password",
        type: "passwordInput",
        defaultValue: "",
        required: false, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Photo",
        slug: "image",
        type: "textInput",
        defaultValue: "",
        required: false, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "https://github.com/shadcn.png";
        },
      },
      {
        name: "Role",
        slug: "role",
        type: "selectInput",
        defaultValue: "USER",
        options: ["USER", "ADMIN"],
        required: false, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "USER";
        },
      },
      {
        name: "Created At",
        slug: "createdAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst", "findUnique", "findMany"],
        frontend: ["list", "view"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Updated At",
        slug: "updatedAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst", "findUnique", "findMany"],
        frontend: ["list", "view"],
        valueGetter: () => {
          return "";
        },
      },
    ],
  },
  {
    name: "Working On Jobs",
    model: "workingOnJobs",
    meta: {
      title: "delievery",
    },
    updateField: "updatedAt",
    searchConfig: {
      searchFields: ["title"],
      sortBy: "desc",
      sortField: "createdAt",
    },
    fields: [
      {
        name: "Delievery",
        slug: "delievery",
        type: "markdownInput",
        defaultValue: "",
        required: false,
        dataType: "string",
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "update",
          "delete",
          "findMany",
          "create",
        ],
        frontend: ["list", "view", "update", "delete"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Status",
        slug: "status",
        type: "selectInput",
        defaultValue: "WORKING",
        required: false,
        dataType: "string",
        options: ["WORKING", "IN_REVIEW", "APPROVED", "NOT_APPROVED", "POSTED"],
        customClassName: "",
        backend: ["findFirst", "findUnique", "create", "update", "delete", "findMany"],
        frontend: ["list", "view", "delete"],
        valueGetter: () => {
          return "OPEN";
        },
      },
      {
        name: "Job",
        slug: "job",
        type: "relation",
        defaultValue: "",
        required: true,
        dataType: "relation",
        customClassName: "",
        backend: ["create"],
        frontend: [],
        valueGetter: () => {
          return ""
        }
      },
      {
        name: "User",
        slug: "user",
        type: "relation",
        defaultValue: "",
        required: true,
        dataType: "relation",
        customClassName: "",
        backend: ["create", "findMany"],
        frontend: [],
        valueGetter: () => {
          return ""
        }
      },
      {
        name: "Created At",
        slug: "createdAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst", "findUnique", "findMany"],
        frontend: ["list", "view"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Updated At",
        slug: "updatedAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst", "findUnique", "findMany"],
        frontend: ["list", "view"],
        valueGetter: () => {
          return "";
        },
      },
    ],
  },
];



export const loginSchema = [
  {
    name: "Login",
    model: "user",
    meta: {
      title: "username",
    },
    updateField: "updatedAt",
    searchConfig: {
      searchFields: ["email", "username"],
      sortBy: "desc",
      sortField: "createdAt",
    },
    fields: [
      {
        name: "Email",
        slug: "email",
        type: "emailInput",
        defaultValue: "",
        required: true, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Password",
        slug: "password",
        type: "passwordInput",
        defaultValue: "",
        required: true, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Created At",
        slug: "createdAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst", "findUnique", "findMany"],
        frontend: ["list", "view"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Updated At",
        slug: "updatedAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst", "findUnique", "findMany"],
        frontend: ["list", "view"],
        valueGetter: () => {
          return "";
        },
      },
    ],
  },
]