package SissaPayment;

public class kingGift {
	
	static boolean debug = false;
	
	public static void main(String[] args) {
		System.out.println(payment(1));
	}
	public static double payment(int nbGrainOfRice) {
		double nbGoRice = (double)nbGrainOfRice;
		int chessRaw = 8;
		int chessCol = 8;
		int totalCase = chessRaw * chessCol;
		int j = 1;
		String text = nbGoRice + ",";
		
		for (int i = 0; i < totalCase; i++) {
			double GoR = nbGoRice + nbGoRice;
			text += GoR + ",";
			nbGoRice = GoR;
			j++;
			if (j%chessRaw == 0) {
				text += "\n";
				j=0;
			}
		}
		if(debug) {
			System.out.println(text);
		}
		return nbGoRice;
	}

}
