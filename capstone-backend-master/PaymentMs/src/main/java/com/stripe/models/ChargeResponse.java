package com.stripe.models;

public class ChargeResponse {

    private String email;
    private String token;
    private Integer amount;

    public ChargeResponse() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public ChargeResponse(String email, String token) {
        this.email = email;
        this.token = token;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
