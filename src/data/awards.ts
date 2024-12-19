export type Nominee = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
  nominees: Nominee[];
};

export const awards: Category[] = [
  {
    id: 1,
    name: "Mejor Amigo",
    nominees: [
      { id: 1, name: "Juan Pérez" },
      { id: 2, name: "María López" },
      { id: 3, name: "Carlos Gómez" },
    ],
  },
  {
    id: 2,
    name: "Mejor Humor",
    nominees: [
      { id: 4, name: "Ana Torres" },
      { id: 5, name: "Luis Martínez" },
      { id: 6, name: "Sofía Ramírez" },
    ],
  },
];
