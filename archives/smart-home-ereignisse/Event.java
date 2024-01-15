import java.time.LocalDateTime;

public class Event {
    private int id;
    private LocalDateTime timeFired;
    private String context;

    public Event(int pId, LocalDateTime pTimeFired, String pContext) {
        id = pId;
        timeFired = pTimeFired;
        context = pContext;
    }

    public int getId() {
        return id;
    }

    public LocalDateTime getTimeFired() {
        return timeFired;
    }

    public String getContext() {
        return context;
    }
}
