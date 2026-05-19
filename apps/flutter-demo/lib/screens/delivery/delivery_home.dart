import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

class DeliveryHomeScreen extends StatelessWidget {
  const DeliveryHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // Hero app bar con mapa mock
          SliverAppBar(
            expandedHeight: 220,
            pinned: true,
            backgroundColor: cs.secondary,
            foregroundColor: Colors.white,
            title: const Text('FDS Delivery'),
            actions: [IconButton(icon: const Icon(Icons.notifications_outlined), onPressed: () {})],
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                color: cs.secondary,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    // Map mock
                    Opacity(
                      opacity: 0.25,
                      child: GridView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 8),
                        itemCount: 64,
                        itemBuilder: (_, __) => Container(
                          margin: const EdgeInsets.all(1),
                          decoration: BoxDecoration(color: Colors.white12, borderRadius: BorderRadius.circular(2)),
                        ),
                      ),
                    ),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const SizedBox(height: 40),
                        Icon(Icons.delivery_dining, size: 48, color: cs.primary),
                        const SizedBox(height: 8),
                        Text('Ruta activa', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 14)),
                        Text('12 paradas · ~3h 20min', style: TextStyle(color: Colors.white70, fontSize: 12)),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),

          SliverPadding(
            padding: const EdgeInsets.all(16),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                // Progress cards
                Row(children: [
                  Expanded(child: _StatCard('Entregados', '8', Icons.check_circle_outline, cs.primary)),
                  const SizedBox(width: 12),
                  Expanded(child: _StatCard('Pendientes', '4', Icons.access_time_outlined, const Color(0xFFFBBF24))),
                  const SizedBox(width: 12),
                  Expanded(child: _StatCard('Fallidos', '0', Icons.cancel_outlined, const Color(0xFF047E48))),
                ]),
                const SizedBox(height: 20),

                // Next delivery
                Text('Próxima entrega', style: theme.textTheme.titleMedium),
                const SizedBox(height: 10),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(color: cs.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
                            child: Icon(Icons.inventory_2_outlined, color: cs.primary, size: 20),
                          ),
                          const SizedBox(width: 12),
                          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            Text('Pedido #DLV-7821', style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700, color: theme.textTheme.bodyLarge?.color)),
                            Text('María López · 2 paquetes', style: theme.textTheme.bodySmall),
                          ])),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(color: cs.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(4)),
                            child: Text('Siguiente', style: TextStyle(color: cs.primary, fontSize: 11, fontWeight: FontWeight.w600)),
                          ),
                        ]),
                        const SizedBox(height: 12),
                        const Divider(height: 1),
                        const SizedBox(height: 12),
                        Row(children: [
                          const Icon(Icons.location_on_outlined, size: 16, color: Color(0xFF63767A)),
                          const SizedBox(width: 4),
                          const Expanded(child: Text('Av. Insurgentes Sur 1234, Col. Del Valle', style: TextStyle(fontSize: 13, color: Color(0xFF37474F)))),
                        ]),
                        const SizedBox(height: 4),
                        Row(children: [
                          const Icon(Icons.access_time_outlined, size: 16, color: Color(0xFF63767A)),
                          const SizedBox(width: 4),
                          Text('Ventana: 14:00 – 16:00 · 8 min en llegar', style: theme.textTheme.bodySmall),
                        ]),
                        const SizedBox(height: 16),
                        Row(children: [
                          Expanded(child: FdsButton(label: 'Navegar', leadingIcon: const Icon(Icons.navigation_outlined), onPressed: () {})),
                          const SizedBox(width: 8),
                          FdsButton(label: 'Detalles', variant: FdsButtonVariant.ghost, onPressed: () {}),
                        ]),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 20),

                // Today's timeline
                Text('Ruta de hoy', style: theme.textTheme.titleMedium),
                const SizedBox(height: 10),
                _StopTile(stop: 1, address: 'Calle Morelos 45', name: 'Juan Pérez', status: 'done', time: '10:32'),
                _StopTile(stop: 2, address: 'Av. Reforma 800', name: 'Ana García', status: 'done', time: '11:15'),
                _StopTile(stop: 3, address: 'Insurgentes Sur 1234', name: 'María López', status: 'next', time: '~14:20'),
                _StopTile(stop: 4, address: 'Blvd. Manuel Ávila 56', name: 'Roberto Cruz', status: 'pending', time: '~15:00'),
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
    final theme = Theme.of(context);
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 10),
        child: Column(children: [
          Icon(icon, color: color, size: 18),
          const SizedBox(height: 4),
          Text(value, style: theme.textTheme.titleLarge?.copyWith(color: color)),
          Text(label, style: theme.textTheme.labelSmall, textAlign: TextAlign.center),
        ]),
      ),
    );
  }
}

class _StopTile extends StatelessWidget {
  const _StopTile({required this.stop, required this.address, required this.name, required this.status, required this.time});
  final int stop;
  final String address, name, status, time;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    final (Color dotColor, IconData dotIcon) = switch (status) {
      'done'    => (const Color(0xFF047E48), Icons.check),
      'next'    => (cs.primary, Icons.navigation),
      _         => (const Color(0xFFBECBC9), Icons.circle_outlined),
    };

    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Column(children: [
            Container(
              width: 28, height: 28,
              decoration: BoxDecoration(color: dotColor, shape: BoxShape.circle),
              child: Icon(dotIcon, color: Colors.white, size: 14),
            ),
            if (stop < 4) Container(width: 2, height: 40, color: const Color(0xFFE7EBEA)),
          ]),
          const SizedBox(width: 12),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(top: 4, bottom: 8),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Expanded(child: Text(name, style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600, color: theme.textTheme.bodyLarge?.color))),
                  Text(time, style: theme.textTheme.labelSmall),
                ]),
                Text(address, style: theme.textTheme.bodySmall),
              ]),
            ),
          ),
        ],
      ),
    );
  }
}
