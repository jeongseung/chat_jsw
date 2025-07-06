package com.smhrd.gloring.oauth;

import java.util.Map;

public class GoogleUserInfo {

    private Map<String, Object> attributes;

    public GoogleUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public String getProviderId() {
        return (String) attributes.get("sub");
    }

    public String getProvider() {
        return "google";
    }

    public String getEmail() {
        return (String) attributes.get("email");
    }

    public String getName() {
        return (String) attributes.get("name");
    }
}
