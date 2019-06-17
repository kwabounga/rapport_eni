package Outils;

public class textRefact {
	final public static int BLOC_LENGTH = 60;
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	public static String titleThat(String txt) {
		return titleThat(txt, BLOC_LENGTH);
	}
	public static String titleThat(String txt1, String txt2) {
		return titleThat( txt1,  txt2,  BLOC_LENGTH);
	}
	public static String titleThat(String txt1, String txt2, int length) {
		String line = line(length);
		
		textAndWhite(txt2, length/2);
		String viewTxt = "";
		viewTxt = line; 
		viewTxt = viewTxt + "\n";
		viewTxt = viewTxt + textAndWhite(txt1, length/2);
		viewTxt = viewTxt + textAndWhite(txt2, length/2);
		viewTxt = viewTxt + "\n";
		viewTxt = viewTxt + line;
		viewTxt = viewTxt + "\n";
		return viewTxt;
	}
	
	public static String blocThat(String txt) {
		return blocThat(txt, BLOC_LENGTH);
	}
	public static String blocThat(String txt, int length) {
		String blocedTxt = "";
		String workingSetTxt = "";
		String[] arWords = txt.split("\\s");
		for (int i = 0; i < arWords.length; i++) {
			if(workingSetTxt.length() + arWords[i].length() > length ) {
				blocedTxt += "\n";
				workingSetTxt = "";
				workingSetTxt += arWords[i]+ " ";
				blocedTxt += arWords[i];
				
			}else {
				workingSetTxt += arWords[i] + " ";
				blocedTxt += arWords[i] + " ";
			}
		}
		return blocedTxt;
	}
	public static String textAndWhite(String txt) {
		return textAndWhite(txt, BLOC_LENGTH);
	}
	public static String textAndWhite(String txt, int length) {
		int l = txt.length();
		int space = (int)((length-l)/2);
		String txtPre = "|";
		String txtApp = "";
		for (int i = 0; i < (space-1); i++) {
			txtPre = txtPre + " ";
			txtApp = txtApp + " ";
		}
		txtApp = txtApp + ((txt.length()%2 == 0)?"":" ");
		txtApp = txtApp + "|";
		return txtPre + txt + txtApp;
	}
	public static String titleThat(String txt, int length) {	
		
		String viewTxt = "";
		String line = line(length);
		viewTxt  = line;
		viewTxt  = viewTxt + "\n";
		viewTxt  = viewTxt + textAndWhite(txt,length);
		viewTxt  = viewTxt + "\n";
		viewTxt  = viewTxt + line; 
//		viewTxt  = viewTxt + "\n";
		
		return viewTxt;
	}
	public static String line() {
		return line(BLOC_LENGTH);
	}
	public static String line(int length) {
		String line = ""; 
		for (int i = 0; i < length; i++) {
			line = line + "-";
		}
		return line;
	}
	public static double afterDot(double value, int numAftDot) {
		int mult = 1;
		for (int i = 0; i < numAftDot; i++) {
			mult *= 10;
		}
		double ret = value * mult;
		ret = (int)ret;
		ret = (double)ret/mult;
		return ret ;
	}
	
}
