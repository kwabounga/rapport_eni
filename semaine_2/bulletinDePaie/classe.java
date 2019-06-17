package bulletinDePaie;


import Outils.Pratique;
import Outils.textRefact;

public class classe {
	
	static String nom;  
	static String prenom;  
	static int statut;
	static int nbHeuresTravaille;  
	static double tauxHoraire;
	static int nombreEnfants;
	
	final static int ID_ASERVICE = 1;
	final static int ID_EBUREAU = 2;
	final static int ID_CADRE = 3;
	
	 static String statutTexte;
	 final static String STAT_ASERVICE  = "Agent de service";
	 final static String STAT_EBUREAU  = "Employé de bureau";
	 final static String STAT_CADRE  = "Cadre";
	
	 final static int H_BASE  = 169;
	 final static int  H_MAJOR  = 11;
	
	 static int nbHeureRestantes  = 0;
	
	 static int nbHNormal  = 0;
	 static int nbHMajor  = 0;
	 static int nbHMajorPlus  = 0;
	 static double salaireBrut;
	
	 final static double COTI_SOC_GEN_IMP  = 3.49;
	 final static double COTI_SOC_GEN_NON_IMP  = 6.15;
	 final static double COTI_ASS_MALADIE  = 0.95;
	 final static double COTI_ASS_VIEILLESSE  = 8.44;
	 final static double COTI_ASS_CHOMAGE  = 3.05;
	 final static double COTI_RETRAIT_COMP  = 3.81;
	 final static double COTI_AGFF  = 1.02;
	
	 static double totalCotisation;  
	 static double salaireNet; 
	 static int primeFamiliale; 
	 
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		nom = giveLName();
		prenom = giveFName();
		statut = giveStatut();
		nbHeuresTravaille = giveHoursWork();
		tauxHoraire = giveTimeValue();		
		nombreEnfants = giveNbChildren();
		calculateBrut();
		calculateNet();
		calculatePrime();		
	}
	
	public static void calculateNet() {
		System.out.println(textRefact.line());
		System.out.println(textRefact.textAndWhite(nbHNormal + "h  sans majoration"));
		System.out.println(textRefact.textAndWhite(nbHMajor + "h avec une majoration de 50%"));
		System.out.println(textRefact.textAndWhite(nbHMajorPlus + "h avec une majoration de 60%"));
		System.out.println(textRefact.line());

		// Cotisations;
		System.out.println(textRefact.titleThat("Calcul des cotisations:"));
		System.out.println("- Contribution pour le remboursement de la dette sociale et\n contribution sociale généralisée imposable");
		System.out.printf("%.2f€ x %.2f%% = %.2f€ %n", salaireBrut, COTI_SOC_GEN_IMP, ((salaireBrut * COTI_SOC_GEN_IMP) /100));
		
		totalCotisation = (salaireBrut * COTI_SOC_GEN_IMP)/100;
		System.out.println(textRefact.line());
		System.out.println("- Contribution sociale généralisée non imposable");
		System.out.printf("%.2f€ x %.2f%% = %.2f€ %n", salaireBrut, COTI_SOC_GEN_NON_IMP, (salaireBrut * COTI_SOC_GEN_NON_IMP) /100);
		
		totalCotisation = totalCotisation + (salaireBrut * COTI_SOC_GEN_NON_IMP)/100;
		System.out.println(textRefact.line());
		System.out.println("- Assurance maladie");
		System.out.printf("%.2f€ x %.2f%% = %.2f€ %n", salaireBrut, COTI_ASS_MALADIE, (salaireBrut * COTI_ASS_MALADIE) /100);
		
		totalCotisation = totalCotisation + (salaireBrut * COTI_ASS_MALADIE)/100;
		System.out.println(textRefact.line());
		System.out.println("- Assurance vieillesse");
		System.out.printf("%.2f€ x %.2f%% = %.2f€ %n", salaireBrut, COTI_ASS_VIEILLESSE, (salaireBrut * COTI_ASS_VIEILLESSE) /100);
		
		totalCotisation = totalCotisation + (salaireBrut * COTI_ASS_VIEILLESSE)/100;
		System.out.println(textRefact.line());
		System.out.println("- Assurance chômage");
		System.out.printf("%.2f€ x %.2f%% = %.2f€ %n", salaireBrut, COTI_ASS_CHOMAGE, (salaireBrut * COTI_ASS_CHOMAGE) /100);
		
		totalCotisation = totalCotisation + (salaireBrut * COTI_ASS_CHOMAGE)/100;
		System.out.println(textRefact.line());
		System.out.println("- Retraite complémentaire (IRCEM)");
		System.out.printf("%.2f€ x %.2f%% = %.2f€ %n", salaireBrut, COTI_RETRAIT_COMP, (salaireBrut * COTI_RETRAIT_COMP) /100);
		
		totalCotisation = totalCotisation + (salaireBrut * COTI_RETRAIT_COMP)/100;
		System.out.println(textRefact.line());
		System.out.println("- Cotisation AGFF");
		System.out.printf("%.2f€ x %.2f%% = %.2f€ %n", salaireBrut, COTI_AGFF, (salaireBrut * COTI_AGFF) /100);

		totalCotisation = totalCotisation + (salaireBrut * COTI_AGFF)/100;
		System.out.println(textRefact.line());
		System.out.println(textRefact.textAndWhite("Total des cotisations salariales"));
		System.out.printf( textRefact.textAndWhite(textRefact.afterDot(totalCotisation ,2) + "€")+"\n");

		salaireNet = (salaireBrut - totalCotisation);
		System.out.println(textRefact.line());
		System.out.printf(textRefact.titleThat("Salaire Net : " + textRefact.afterDot(salaireNet,2) + "€")+"\n");
		 
	}
	
	public static void calculatePrime() {
		switch (nombreEnfants) {
		case 0:
			 primeFamiliale = 0;
			break;
		case 1:
			primeFamiliale = 20;
			
			break;
		case 2:
			primeFamiliale = 50;
			
			break;

		default:
			primeFamiliale = 70 + (nombreEnfants-2)*20;
			break;
		}
		System.out.println("\n");		
		System.out.println(textRefact.line());
		System.out.println(textRefact.textAndWhite("- Prime familiale :"  + primeFamiliale + " €"));
		System.out.println(textRefact.line());
		System.out.printf(textRefact.titleThat("net à payer : " + textRefact.afterDot(salaireNet+primeFamiliale,2) + "€"));
		System.out.println("\n");
	}
	public static void calculateBrut() {
		System.out.println("\n");		
		System.out.println(textRefact.titleThat("BULLETIN DE SALAIRE"));
		System.out.println(textRefact.titleThat(nom.toUpperCase(), prenom.toUpperCase()));
		
		switch (statut) {
		case ID_ASERVICE:
			statutTexte = STAT_ASERVICE;
			break;
		case ID_EBUREAU:
			statutTexte = STAT_EBUREAU;
			break;		
		default:
			statutTexte = STAT_CADRE;
			break;
		}
		System.out.println(textRefact.line());
		System.out.println(textRefact.textAndWhite("Statut: " + statutTexte));
		
		if (nbHeuresTravaille <= H_BASE) {
			// pas de majoration
			nbHNormal = nbHeuresTravaille;
		} else {
			nbHNormal = H_BASE;
			nbHeureRestantes = (int)(nbHeuresTravaille - H_BASE);
			if (nbHeuresTravaille <= H_MAJOR) {
				// 50 %
				nbHMajor = nbHeureRestantes;
			}else {
				//60 %
				nbHMajor = H_MAJOR;
				nbHMajorPlus = (nbHeureRestantes - H_MAJOR);
			}
		}
		
		salaireBrut = (nbHNormal * tauxHoraire) + (nbHMajor * tauxHoraire * 1.5) + (nbHMajorPlus * tauxHoraire * 1.6);
		System.out.println(textRefact.textAndWhite("Salaire Brut: " + textRefact.afterDot(salaireBrut,2)  + "€ "));
	}
	public static String giveLName() {
		String ln;		
		ln = (String)Pratique.saisir("Ecrivez votre nom:");
		System.out.println("Votre nom est: " + ln);		
		return ln;
	}
	
	public static String giveFName() {
		String fn;		
		fn = (String)Pratique.saisir("Ecrivez votre prenom:");
		System.out.println("Votre prenom est: " + fn);		
		return fn;
	}
	
	public static int giveStatut() {
		int s;
		do {			
			System.out.println("Veuilez choisir votre statut:");
			System.out.println( ID_ASERVICE + ":" + STAT_ASERVICE);
			System.out.println( ID_EBUREAU + ":" + STAT_EBUREAU);
			System.out.println( ID_CADRE + ":" + STAT_CADRE);
			s = Pratique.saisirUnEntier("");
//			System.out.println("Vous avez choisi: " + s);
		} while (s == -1 | !Pratique.estComprisEntre( (double)1, (double)3, (double)s ));
		System.out.println("vous avez choisi: " + s);
		return s;
	}
	
	public static int giveHoursWork() {
		int h;
		do {			
			System.out.println("Veuilez choisir le nombre d'heures travaillés:");
			h = Pratique.saisirUnEntier("");
//			System.out.println("Vous avez choisi: " + h);
		} while (Double.isNaN(h));
		System.out.println("vous avez travaillé: " + h + "h");
		return h;
	}
		
	public static double giveTimeValue() {
		double th;
		do {			
			System.out.println("Veuilez choisir le taux horaire:");
			th = Pratique.saisirUnDecimal("");
//			System.out.println("Vous avez choisi: " + th);
		} while (Double.isNaN(th));
		System.out.println("vous etes payé: " + th + " de l'heure");
		return th;
	}
	public static int giveNbChildren() {
		int c;
		do {			
			System.out.println("Veuilez indiquer le nombre d'enfants à charge:");
			c = Pratique.saisirUnEntier("");
//			System.out.println("Vous avez choisi: " + c);
		} while (c == -1 );
		System.out.println("vous avez " + c + " enfant(s)");
		return c;
	}
	
}
