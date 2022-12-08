declare module "styled-components" {
  interface DefaultTheme {
    borderColor: string;
    bgColor: string;
    ftColor: string;
    boxColor: string;
  }
}

export const lightTheme = {
  borderColor: "#e4e4e4",
  bgColor: "#fafafa",
  ftColor: "black",
  boxColor: "white",
};

export const darkTheme = {
  borderColor: "gray",
  bgColor: "#1E1F21",
  ftColor: "white",
  boxColor: "#2C2D30",
};
