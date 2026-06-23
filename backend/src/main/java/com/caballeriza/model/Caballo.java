package com.caballeriza.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "caballos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Caballo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(unique = true, nullable = false)
    private String identificador;

    private Integer edad;
    private String raza;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    private Double peso;
    private String fotoUrl;
    @JsonIgnore
    @OneToMany(mappedBy = "caballo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HistorialMedico> historialMedico;
    @JsonIgnore
    @OneToMany(mappedBy = "caballo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlanAlimentacion> planesAlimentacion;

    public enum Sexo { MACHO, HEMBRA }
}