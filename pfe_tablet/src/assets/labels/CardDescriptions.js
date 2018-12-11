const B = "Les cartes bleues ou bâtiments civils vous octroient directement des points de victoire décomptés à la fin du jeu. Le chaînage vous sera très utile pour en obtenir un maximum.";
const S = "Les cartes vertes ou bâtiments scientifiques vous octroient des points de victoires en fonction des combinaisons que vous construirez. Un triplet (trois symboles différents) vaut 7 points et avoir n cartes de même symbole vous rapporte n² points.";
const R = "Les cartes marrons vous approvisionnent en matières premières utiles pour construire des bâtiments.";
const P = "Les cartes grises vous approvisionnent en produits manufacturés utiles pour construire des bâtiments.";
const E = "Les cartes jaunes ou cartes commerciales ont des effets particuliers qui peuvent être du gain de points de victoire, d'argent ou de ressources non vendables ou encore réduire le coût d'achat des ressources chez vos voisins.";
const A = "Les cartes rouges ou cartes armée vous octroient des points de guerre qui seront utiles à chaque fin d'âge pour battre vos voisins et obtenir ainsi des points de victoire.";
const G = "Les cartes violettes ou guildes vous octroient des points de victoire selon des critères particuliers, souvent vos bâtiments construits et ceux de vos voisins.";

export function getDescriptions(letter) {
    switch (letter) {
        case "B":
            return B;
        case "S":
            return S;
        case "R":
            return R;
        case "P":
            return P;
        case "E":
            return E;
        case "A":
            return A;
        case "G":
            return G;
        default:
            return "error";
    }
}