import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

class DeliveryHomeScreen extends StatelessWidget {
  const DeliveryHomeScreen({super.key});

  static const primary = Color(0xFF0A8920);
  static const secondary = Color(0xFF2D3A41);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF9FBFC),
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            pinned: true,
            expandedHeight: 160,
            backgroundColor: secondary,
            foregroundColor: Colors.white,
            actions: [
              IconButton(icon: const Icon(Icons.notifications_outlined), onPressed: () {}),
              const SizedBox(width: 4),
            ],
            flexibleSpace: FlexibleSpaceBar(
              titlePadding: const EdgeInsets.fromLTRB(16, 0, 16, 14),
              title: Row(children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(color: primary.withOpacity(0.25), borderRadius: BorderRadius.circular(9999)),
                  child: Row(mainAxisSize: MainAxisSize.min, children: [
                    const Icon(Icons.location_on, color: Colors.white, size: 11),
                    const SizedBox(width: 3),
                    const Text('Jumbo Portal La Dehesa', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w600)),
                    const Icon(Icons.keyboard_arrow_down, color: Colors.white, size: 13),
                  ]),
                ),
              ]),
              background: Container(
                color: secondary,
                padding: const EdgeInsets.fromLTRB(16, 56, 16, 0),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  const Text('FDS Delivery', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
                  const SizedBox(height: 4),
                  Text('Buenos días, Miguel', style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 14)),
                  const SizedBox(height: 12),
                  // Route progress
                  Row(children: [
                    Icon(Icons.delivery_dining, color: primary, size: 16),
                    const SizedBox(width: 6),
                    const Text('Ruta activa · 12 paradas', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600)),
                    const Spacer(),
                    Text('~3h 20min', style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 12)),
                  ]),
                  const SizedBox(height: 6),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(3),
                    child: LinearProgressIndicator(
                      value: 8 / 12,
                      minHeight: 4,
                      backgroundColor: Colors.white24,
                      valueColor: AlwaysStoppedAnimation(primary),
                    ),
                  ),
                ]),
              ),
            ),
          ),

          SliverPadding(
            padding: const EdgeInsets.all(16),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                // Stats row
                Row(children: [
                  Expanded(child: _StatCard('Entregados', '8', Icons.check_circle_outline, primary)),
                  const SizedBox(width: 10),
                  Expanded(child: _StatCard('Pendientes', '4', Icons.access_time_outlined, const Color(0xFFFBBF24))),
                  const SizedBox(width: 10),
                  Expanded(child: _StatCard('Fallidos', '0', Icons.cancel_outlined, const Color(0xFFD72A22))),
                ]),
                const SizedBox(height: 20),

                // Próxima entrega
                Text('Próxima entrega', style: theme.textTheme.titleMedium),
                const SizedBox(height: 10),
                _NextDeliveryCard(),
                const SizedBox(height: 20),

                // Timeline de hoy
                Text('Ruta de hoy', style: theme.textTheme.titleMedium),
                const SizedBox(height: 12),
                _StopRow(1, 'Juan Pérez', 'Calle Morelos 45', '10:32', 'done'),
                _StopRow(2, 'Ana García', 'Av. Reforma 800', '11:15', 'done'),
                _StopRow(3, 'María López', 'Insurgentes Sur 1234', '~14:20', 'next'),
                _StopRow(4, 'Roberto Cruz', 'Blvd. M. Ávila 56', '~15:00', 'pending'),
                const SizedBox(height: 80),
              ]),
            ),
          ),
        ],
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard(this.label, this.value, this.icon, this.color);
  final String label, value;
  final IconData icon;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFFE7EBEA)),
      ),
      child: Column(children: [
        Icon(icon, color: color, size: 18),
        const SizedBox(height: 4),
        Text(value, style: TextStyle(color: color, fontSize: 20, fontWeight: FontWeight.w800)),
        Text(label, style: const TextStyle(fontSize: 10, color: Color(0xFF63767A)), textAlign: TextAlign.center),
      ]),
    );
  }
}

class _NextDeliveryCard extends StatelessWidget {
  static const primary = Color(0xFF0A8920);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: primary, width: 1.5),
      ),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(color: primary.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
              child: Icon(Icons.inventory_2_outlined, color: primary, size: 18),
            ),
            const SizedBox(width: 12),
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Text('Pedido #DLV-7821', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: Color(0xFF192126))),
              const Text('María López · 2 paquetes', style: TextStyle(fontSize: 12, color: Color(0xFF63767A))),
            ])),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
              decoration: BoxDecoration(color: primary.withOpacity(0.1), borderRadius: BorderRadius.circular(4)),
              child: Text('Siguiente', style: TextStyle(color: primary, fontSize: 10, fontWeight: FontWeight.w700)),
            ),
          ]),
          const Divider(height: 20),
          Row(children: [
            const Icon(Icons.location_on_outlined, size: 14, color: Color(0xFF63767A)),
            const SizedBox(width: 4),
            const Expanded(child: Text('Insurgentes Sur 1234, Del Valle', style: TextStyle(fontSize: 12, color: Color(0xFF37474F)))),
          ]),
          const SizedBox(height: 4),
          Row(children: [
            const Icon(Icons.access_time_outlined, size: 14, color: Color(0xFF63767A)),
            const SizedBox(width: 4),
            const Text('Ventana: 14:00–16:00 · 8 min en llegar', style: TextStyle(fontSize: 12, color: Color(0xFF63767A))),
          ]),
          const SizedBox(height: 14),
          Row(children: [
            Expanded(child: FdsButton(label: 'Navegar', leadingIcon: const Icon(Icons.navigation_outlined), onPressed: () {})),
            const SizedBox(width: 8),
            FdsButton(label: 'Detalles', variant: FdsButtonVariant.ghost, onPressed: () {}),
          ]),
        ]),
      ),
    );
  }
}

class _StopRow extends StatelessWidget {
  const _StopRow(this.n, this.name, this.address, this.time, this.status);
  final int n;
  final String name, address, time, status;

  static const primary = Color(0xFF0A8920);

  @override
  Widget build(BuildContext context) {
    final (Color dot, Widget icon) = switch (status) {
      'done'    => (const Color(0xFF047E48), const Icon(Icons.check, color: Colors.white, size: 14)),
      'next'    => (primary, const Icon(Icons.navigation, color: Colors.white, size: 14)),
      _         => (const Color(0xFFBECBC9), const Icon(Icons.circle, color: Colors.white, size: 8)),
    };

    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Column(children: [
          Container(
            width: 28, height: 28,
            decoration: BoxDecoration(color: dot, shape: BoxShape.circle),
            child: Center(child: icon),
          ),
          if (n < 4) Container(width: 2, height: 40, color: const Color(0xFFE7EBEA)),
        ]),
        const SizedBox(width: 12),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.only(top: 4, bottom: 8),
            child: Row(children: [
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(name, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13, color: Color(0xFF192126))),
                Text(address, style: const TextStyle(fontSize: 11, color: Color(0xFF63767A))),
              ])),
              Text(time, style: const TextStyle(fontSize: 11, color: Color(0xFF63767A))),
            ]),
          ),
        ),
      ]),
    );
  }
}
