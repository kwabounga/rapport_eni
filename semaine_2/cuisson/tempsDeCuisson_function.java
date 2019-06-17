package cuisson;

import Outils.Pratique;

public class tempsDeCuisson_function {
	static int viande = -1;
	static int modeDeCuisson = -1;
	static int poidsViandeGr = -1;
	
	static int tempsDeCuissonType;
	static int tempsDeCuissonSec;
	static int poidsType;
	
	final static int viandeBoeuf = 1;
	final static int viandeAgneau = 2;
	
	final static int poidsTypeBoeuf = 500;
	final static int poidsTypeAgneau = 400;
	
	final static int cuissonBleu = 1;
	final static int cuissonAPoint = 2;
	final static int cuissonBienCuit = 3;
	
	final static String[] nomsViandes = new String[2];
	final static String[] nomsCuissons = new String[3];
	
	
	public static void main(String[] args) {		
		
		System.out.println("TP.cuisson.tempsDeCuisson");
		
		initalisation();
		
		viande = choixViande();
		poidsViandeGr = choixPoids();
		modeDeCuisson = choixCuisson();
		
		System.out.println("Vous devriez laisser votre viande pendant " + calculeTempCuisson() + " secondes");
		System.out.println("Bon Appetit.");
	}
		
	public static void initalisation() {
		System.out.println("initialisation des variables");
		nomsViandes[0] = "Boeuf";
		nomsViandes[1] = "Agneau";
		
		nomsCuissons[0] = "Bleu";
		nomsCuissons[1] = "a point";
		nomsCuissons[2] = "bien cuit";
	}
	
	public static int choixPoids() {
		int p;
		do {
			System.out.println("Veuillez indiquer le poids de la viande:");
			p = Pratique.saisirUnEntier("poids de la viande (gr)");
			System.out.println("Vous avez choisi: " + p);
		} while (p == -1);
		System.out.println("vous avez defini le poids de la viande à: " + p + " gr.");		
		return p;
	}
	
	public static int choixCuisson() {	
		int m;
		do {
			m = Pratique.saisirUnEntier("Veuiller indiquer le mode de cuisson désiré: \n 1: " + nomsCuissons[0] + ", 2: " + nomsCuissons[1] + ", 3: " + nomsCuissons[2] );
//			if(!Pratique.estComprisEntre( (double)0, (double)3, (double)m ) ) {
//				m = 3;
//			}
			System.out.println("Vous avez choisi: " + m);
		} while (m == -1 | !Pratique.estComprisEntre( (double)1, (double)3, (double)m ));
		System.out.println("vous avez choisi une cuisson " + nomsCuissons[m-1]);
		return m;
	}
	
	public static int choixViande() {
		int v;
		do {
			System.out.println("Veuilez choisir votre viande:");
			v = Pratique.saisirUnEntier("1:Boeuf , 2:Agneau");
			System.out.println("Vous avez choisi: " + v);
		} while (v == -1 | !Pratique.estComprisEntre( (double)1, (double)2, (double)v ));
		System.out.println("vous avez choisi: " + nomsViandes[v-1]);
		return v;
		
	}
	
	public static int calculeTempCuisson() {
		switch (viande) {
		case viandeBoeuf:
			poidsType = poidsTypeBoeuf;
			switch (modeDeCuisson) {
				case cuissonBleu:
					tempsDeCuissonType = 10;
					break;
				case cuissonAPoint:
					tempsDeCuissonType = 17;				
					break;
				case cuissonBienCuit:
					tempsDeCuissonType = 25;				
					break;
	
				default:
					System.out.println("Erreur lors de la saisie du mode de cuisson.");	
					break;
			}
			break;
		case viandeAgneau:
			poidsType = poidsTypeAgneau;
			switch (modeDeCuisson) {
			case cuissonBleu:
				tempsDeCuissonType = 15;
				break;
			case cuissonAPoint:
				tempsDeCuissonType = 25;				
				break;
			case cuissonBienCuit:
				tempsDeCuissonType = 40;				
				break;

			default:
				System.out.println("Erreur lors de la saisie du mode de cuisson.");	
				break;
		}
			break;

		default:
			
			System.out.println("Erreur lors de la saisie du type de viande.");	
			break;
		}
		tempsDeCuissonSec = (int) (((poidsViandeGr * tempsDeCuissonType) / (double)poidsType)*60);
		return tempsDeCuissonSec;
	}

}
