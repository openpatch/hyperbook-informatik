import java.time.LocalDateTime;

public class SmartHome {

    private Event[] eventBacklog;

    public SmartHome() {
        eventBacklog = new Event[100];
        // Beispieldaten
        eventBacklog[0] = new TemperatureChangedEvent(0, LocalDateTime.of(2026, 3, 17, 1, 0, 0), "wohnzimmer.sensor1", 20, 19);
        eventBacklog[1] = new TemperatureChangedEvent(1, LocalDateTime.of(2026, 3, 17, 2, 0, 0), "wohnzimmer.sensor1", 19, 19);
        eventBacklog[2] = new TemperatureChangedEvent(2, LocalDateTime.of(2026, 3, 17, 3, 0, 0), "wohnzimmer.sensor1", 19, 17.5);
        eventBacklog[3] = new TemperatureChangedEvent(3, LocalDateTime.of(2026, 3, 17, 4, 0, 0), "wohnzimmer.sensor1", 17.5, 16);
        eventBacklog[4] = new TemperatureChangedEvent(4, LocalDateTime.of(2026, 3, 17, 5, 0, 0), "wohnzimmer.sensor1", 16, 16.2);
        eventBacklog[5] = new TemperatureChangedEvent(5, LocalDateTime.of(2026, 3, 17, 6, 0, 0), "wohnzimmer.sensor1", 16.2, 14.5);
        eventBacklog[6] = new TemperatureChangedEvent(6, LocalDateTime.of(2026, 3, 17, 7, 0, 0), "wohnzimmer.sensor1", 14.5, 15.1);
        eventBacklog[7] = new TemperatureChangedEvent(7, LocalDateTime.of(2026, 3, 17, 8, 0, 0), "wohnzimmer.sensor1", 15.1, 17.3);
        eventBacklog[8] = new TemperatureChangedEvent(8, LocalDateTime.of(2026, 3, 17, 9, 0, 0), "wohnzimmer.sensor1", 17.3, 18.4);
        eventBacklog[9] = new TemperatureChangedEvent(9, LocalDateTime.of(2026, 3, 17, 10, 0, 0), "wohnzimmer.sensor1", 18.4, 19.2);
        eventBacklog[10] = new TemperatureChangedEvent(10, LocalDateTime.of(2026, 3, 17, 11, 0, 0), "wohnzimmer.sensor1", 19.2, 20);
        eventBacklog[11] = new TemperatureChangedEvent(11, LocalDateTime.of(2026, 3, 17, 12, 0, 0), "wohnzimmer.sensor1", 20, 21.2);
        eventBacklog[12] = new TemperatureChangedEvent(12, LocalDateTime.of(2026, 3, 17, 13, 0, 0), "wohnzimmer.sensor1", 21.2, 20.2);
        eventBacklog[13] = new TemperatureChangedEvent(13, LocalDateTime.of(2026, 3, 17, 14, 0, 0), "wohnzimmer.sensor1", 20.2, 19);
        eventBacklog[14] = new TemperatureChangedEvent(14, LocalDateTime.of(2026, 3, 17, 15, 0, 0), "wohnzimmer.sensor1", 19, 19);
        eventBacklog[15] = new TemperatureChangedEvent(15, LocalDateTime.of(2026, 3, 17, 16, 0, 0), "wohnzimmer.sensor1", 19, 18.3);
        eventBacklog[16] = new StateChangedEvent(16, LocalDateTime.of(2026, 3, 17, 17, 0, 0), "wohnzimmer.lampe1", "on", "off");
        eventBacklog[17] = new StateChangedEvent(17, LocalDateTime.of(2026, 3, 17, 18, 0, 0), "wohnzimmer.lampe2", "on", "off");
        eventBacklog[18] = new StateChangedEvent(18, LocalDateTime.of(2026, 3, 17, 19, 0, 0), "wohnzimmer.lampe3", "on", "off");
        eventBacklog[19] = new StateChangedEvent(19, LocalDateTime.of(2026, 3, 17, 20, 0, 0), "wohnzimmer.lampe3", "off", "on");
        eventBacklog[20] = new StateChangedEvent(20, LocalDateTime.of(2026, 3, 17, 21, 0, 0), "wohnzimmer.lampe2", "off", "on");
        eventBacklog[21] = new StateChangedEvent(21, LocalDateTime.of(2026, 3, 17, 22, 0, 0), "wohnzimmer.lampe2", "on", "off");
        eventBacklog[22] = new StateChangedEvent(22, LocalDateTime.of(2026, 3, 17, 23, 0, 0), "wohnzimmer.lampe1", "off", "on");
    }

    /**
     * Diese Methode soll alle Events im Array eventBacklog ausgeben.
     * Die Ausgabe soll die folgende Form haben
     * 
     * 1. id, timeFired, context
     * 2. id, timeFired, context
     * 3. id, timeFired, context
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