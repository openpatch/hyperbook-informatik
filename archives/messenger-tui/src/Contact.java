
public class Contact {
    private String id;
    private String name;
    private String profilePicturePath;

    public Contact(String pId, String pName, String pProfilePicturePath) {
        id = pId;
        name = pName;
        profilePicturePath = pProfilePicturePath;
    }

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public String getProfilePicturePath() {
        return profilePicturePath;
    }

    public void setProfilePicturePath(String newProfilePicturePath) {
        profilePicturePath = newProfilePicturePath;
    }

    public void setName(String newName) {
        name = newName;
    }
}
