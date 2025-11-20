export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element != null) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
