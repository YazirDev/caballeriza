package com.caballeriza.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "reservas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoReserva tipo;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @ManyToOne
    @JoinColumn(name = "caballo_id")
    private Caballo caballo;

    @ManyToOne
    @JoinColumn(name = "responsable_id")
    private Empleado responsable;

    @Enumerated(EnumType.STRING)
    private EstadoReserva estado;

    private String notas;

    public enum TipoReserva { VETERINARIO, MONTA, PASEO, ENTRENAMIENTO }
    public enum EstadoReserva { PENDIENTE, CONFIRMADA, CANCELADA }
}