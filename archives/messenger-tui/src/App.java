import cipher.CaesarCipher;
import cipher.Cipher;
import cipher.VigenereCipher;
import utils.List;

import javax.swing.*;
import java.util.Date;
import java.util.Random;
import java.util.Scanner;

public class App {
    private String username;
    private Cipher cipher;
    private String secretKey;
    private List<Message> messages;
    private List<Contact> contacts;
    private Scanner scanner;


    public App(String pUsername) {
        this.username = pUsername;
        this.messages = new List<>();
        this.contacts = new List<>();

        scanner = new Scanner(System.in);
        System.out.println("Welche Verschlüsselung möchtest du verwenden? [C]aesar oder [V]igenere");
        String c = scanner.nextLine();
        System.out.println("Gib bitte den Schlüssel ein.");
        this.secretKey = scanner.nextLine();

        // SETUP
        if(c.equals("C")) {
            this.cipher = new CaesarCipher();
        } else if (c.equals("V")) {
            this.cipher = new VigenereCipher();
        } else {
            System.out.println(c + " ist keine valide Option. Bitte gebe C oder V ein");
            System.exit(1);
        }

        // HAUPTMENÜ
        while(true) {
            System.out.println("== HAUPTMENÜ ==");
            System.out.println("[1] Nachrichten anzeigen");
            System.out.println("[2] Nachricht senden");
            System.out.println("[99] Fake Nachricht empfangen");
            System.out.println("[0] Beenden");

            int option = scanner.nextInt();
            scanner.nextLine(); // nextInt scannt keine neue Zeile. Ohne diese Anweisung würde das nächste gewollte nextLine nicht funktionieren.
            if (option == 1) {
                this.showMessages();
            } else if (option == 2) {
                this.sendMessage();
            } else if (option == 3) {
                break;
            } else if (option == 99) {
                this.receiveFakeMessage();
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        new App("glados");
    }

    /**
     * Diese Methode bekommt eine Netzwerknachricht der Form:
     * zeitstempel§username§text
     * z.B.: "1698698068301§ada§Hallo das ist ein Test :)"
     */
    public void receive(String pNetworkMessage) {
        // Teilt die Nachricht an den ersten beiden §-Zeichen auf.
        String[] parts = pNetworkMessage.split("§", 3);
        long time = Long.parseLong(parts[0]);
        String username = parts[1];
        String text = parts[2];

        Message message = new Message(username, text, time);
        // speichere die Nachricht an der nächsten freien Stelle
        this.messages.append(message);
    }

    /**
     * Diese Methode soll aus einem übergebenen Text eine Netzwerknachricht
     * erstellen und diese zurückgeben.
     * Die Nachricht wird im Array messages gespeichert.
     */
    public String send(String pText) {
        long time = new Date().getTime();
        // verschlüsseln bevor die Nachricht speichert wird
        pText = this.cipher.verschluesseln(secretKey, pText);
        Message message = new Message(username, pText, time);

        // speichere die Nachricht an der nächsten freien Stelle
        this.messages.append(message);

        return time + "§" + username + "§" + pText;
    }

    public void showMessages() {
        System.out.println("== NACHRICHTEN ==");
        messages.toFirst();
        while(messages.hasAccess()) {
            System.out.println(messages.getContent().toString(this.cipher, this.secretKey));
            messages.next();
        }
        System.out.println();
    }

    public void sendMessage() {
        System.out.println("== NACHRICHT SENDEN ==");
        System.out.println("Text: ");
        String text = scanner.nextLine();
        this.send(text);
        System.out.println();
    }

    public void receiveFakeMessage() {

        String[] usernames = {"froggy", "fresh", "robo", "mr-zero", "ms-one"};
        int usernameIndex = new Random().nextInt(usernames.length);
        String username = usernames[usernameIndex];

        String[] texts = {"Testnachricht 1", "Testnachricht 2", "Testnachricht 3", "Testnachricht \uD83D\uDE07"};
        int textIndex = new Random().nextInt(texts.length);
        String text = texts[textIndex];
        text = this.cipher.verschluesseln(secretKey, text);
        long time = new Date().getTime();
        String message = time + "§" + username + "§" + text;
        this.receive(message);
    }

    public void showNotification() {

    }
}
