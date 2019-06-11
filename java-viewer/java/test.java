/** Votre premier programme Java */
class FirstApp {
  public static void main (String[] args){
    System.out.println("Hello World");
    int[] main ->
  }
}
/***** Code de MesExemples.com *******/
/**
 * @(#)CopieXMLDoc.java
 *
 *
 * @author
 *sakoba(java.mesexemples.com) @version 1.00 2013/7/4
 */

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class CopieXMLDoc {


  // Utiliser le document source comme le fils du neud principal du document de destination
  public static void copiperDocument(Document source, Document destination)
  {
    Node node = destination.importNode(source.getDocumentElement(), true);

    destination.getDocumentElement().appendChild(node);
  }


}
