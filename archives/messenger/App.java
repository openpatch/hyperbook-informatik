import java.util.Date;

public class App {
    private String username;
    private Message[] messages;
    
    public App(String pUsername) {
        this.username = pUsername;
        this.messages = new Message[100];
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
        this.messages[0] = message;
    }
    
    /**
     * Diese Methode soll aus einem übergebenen Text eine Netzwerknachricht 
     * erstellen und diese zurückgeben. 
     * Die Nachricht im Array messages gespeichert werden.
     */
    public String send(String text) {
        long time = new Date().getTime();
        
        Message message = new Message(username, text, time);
        
        // speichere die Nachricht an der nächsten freien Stelle
        this.messages[1] = message;
        
        return time + "§" + username + "§" + text;
    }
    
    /**
     * Diese Methode soll den Chat-Verlauf auf der Konsole ausgeben.
     */
    public void logHistory() {
        // Lösche die komplette Ausgabe
        System.out.print('\u000C');
        
        // gib alle Nachrichten aus
        System.out.println(messages[0]);
        System.out.println(messages[1]);
    }
}
