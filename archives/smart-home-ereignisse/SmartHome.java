import java.time.LocalDateTime;

public class SmartHome {

    private Event[] eventBacklog;

    public SmartHome() {
        eventBacklog = new Event[100];
        LocalDateTime l = LocalDateTime.now();
        // Beispieldaten
        eventBacklog[0] = new TemperatureChangedEvent(0, l.minusDays(1).plusHours(1), "wohnzimmer.sensor1", 20, 19);
        eventBacklog[1] = new TemperatureChangedEvent(1, l.minusDays(1).plusHours(2), "wohnzimmer.sensor1", 19, 19);
        eventBacklog[2] = new TemperatureChangedEvent(2, l.minusDays(1).plusHours(3), "wohnzimmer.sensor1", 19, 17.5);
        eventBacklog[3] = new TemperatureChangedEvent(3, l.minusDays(1).plusHours(4), "wohnzimmer.sensor1", 17.5, 16);
        eventBacklog[4] = new TemperatureChangedEvent(4, l.minusDays(1).plusHours(5), "wohnzimmer.sensor1", 16, 16.2);
        eventBacklog[5] = new TemperatureChangedEvent(5, l.minusDays(1).plusHours(6), "wohnzimmer.sensor1", 16.2, 14.5);
        eventBacklog[6] = new TemperatureChangedEvent(6, l.minusDays(1).plusHours(7), "wohnzimmer.sensor1", 14.5, 15.1);
        eventBacklog[7] = new TemperatureChangedEvent(7, l.minusDays(1).plusHours(8), "wohnzimmer.sensor1", 15.1, 17.3);
        eventBacklog[8] = new TemperatureChangedEvent(8, l.minusDays(1).plusHours(9), "wohnzimmer.sensor1", 17.3, 18.4);
        eventBacklog[9] = new TemperatureChangedEvent(9, l.minusDays(1).plusHours(10), "wohnzimmer.sensor1", 18.4, 19.2);
        eventBacklog[10] = new TemperatureChangedEvent(10, l.minusDays(1).plusHours(11), "wohnzimmer.sensor1", 19.2, 20);
        eventBacklog[11] = new TemperatureChangedEvent(11, l.minusDays(1).plusHours(12), "wohnzimmer.sensor1", 20, 21.2);
        eventBacklog[12] = new TemperatureChangedEvent(12, l.minusDays(1).plusHours(13), "wohnzimmer.sensor1", 21.2, 20.2);
        eventBacklog[13] = new TemperatureChangedEvent(13, l.minusDays(1).plusHours(14), "wohnzimmer.sensor1", 20.2, 19);
        eventBacklog[14] = new TemperatureChangedEvent(14, l.minusDays(1).plusHours(15), "wohnzimmer.sensor1", 19, 19);
        eventBacklog[15] = new TemperatureChangedEvent(15, l.minusDays(1).plusHours(16), "wohnzimmer.sensor1", 19, 18.3);
        eventBacklog[16] = new StateChangedEvent(16, l.minusDays(1).plusHours(17), "wohnzimmer.lampe1", "on", "off");
        eventBacklog[17] = new StateChangedEvent(17, l.minusDays(1).plusHours(18), "wohnzimmer.lampe2", "on", "off");
        eventBacklog[18] = new StateChangedEvent(18, l.minusDays(1).plusHours(19), "wohnzimmer.lampe3", "on", "off");
        eventBacklog[19] = new StateChangedEvent(19, l.minusDays(1).plusHours(20), "wohnzimmer.lampe3", "off", "on");
        eventBacklog[20] = new StateChangedEvent(20, l.minusDays(1).plusHours(21), "wohnzimmer.lampe2", "off", "on");
        eventBacklog[21] = new StateChangedEvent(21, l.minusDays(1).plusHours(22), "wohnzimmer.lampe2", "on", "off");
        eventBacklog[22] = new StateChangedEvent(22, l.minusDays(1).plusHours(23), "wohnzimmer.lampe1", "off", "on");
    }

    /**
     * Diese Methode soll alle Events im Array eventBacklog ausgeben.
     * Die Ausgabe soll die folgende Form haben
     * 
     * id, timeFired, context
     */
    public void showBacklog() {

    }

    /**
     * Diese Methode soll alle Lampe ausgeben.
     * Die Ausgabe soll die folgende Form haben:
     * context, state
     */
    public void showLights() {

    }

    /**
     * Diese Methode soll die maximal gemessene Temperature zurückgeben.
     * 
     * @return maximale Temperatur
     */
    public double getMaxTemperature() {
        return 0;
    }

    /**
     * Diese Methode soll die Anzahl der AutomationTriggeredEvents zurückgeben.
     * 
     * @return Anzahl der AutomationTriggeredEvents
     */
    public int countAutomationTriggered() {
        return 0;
    }

    /**
     * Diese Methode soll das übergebene Ereignis an die letzte verfügbare Stelle im Array eventBacklog legen.
     * Wenn keine Stelle mehr frei ist, dann soll das älteste (erste) Ereignis entfernt werden, alle Ereignis einen Platz nach vorrücken
     * und dann an die letzte verfügbare Stelle das neue Ereignis gelegt werden.
     */
     public void receiveEvent(Event pEvent) {

     }
}