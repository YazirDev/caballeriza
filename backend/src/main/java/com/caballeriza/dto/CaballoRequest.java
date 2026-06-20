package com.caballeriza.dto;

import com.caballeriza.model.Caballo;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CaballoRequest {

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El identificador es obligatorio")
    private String identificador;

    private Integer edad;
    private String raza;
    private Caballo.Sexo sexo;
    private Double peso;
    private String fotoUrl;
}