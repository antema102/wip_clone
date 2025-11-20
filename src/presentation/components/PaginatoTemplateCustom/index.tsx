import './styles.css'
import { icons } from '../../../resources/constants';

export const paginatorTemplateCustom = {
  PrevPageLink: (options) => (
    <button className="paginatorTemplateCustom prev"
      onClick={options.onClick}
      disabled={options.disabled}
    >
      <span>{"<"}</span>
      Précédent
    </button>
  ),
  PageLinks: undefined
  ,
  NextPageLink: (options) => (
    <button
      className="paginatorTemplateCustom next"
      onClick={options.onClick}
      disabled={options.disabled}
    >
      Suivant 
      <span> {">"} </span>
    </button>
  ),
};