import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';
import '../screens/delivery/delivery_home.dart';
import '../screens/delivery/route_screen.dart';
import '../screens/delivery/packages_screen.dart';
import '../screens/delivery/profile_screen.dart';

class DeliveryApp extends StatelessWidget {
  const DeliveryApp({super.key, required this.onSwitchBrand});
  final VoidCallback onSwitchBrand;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FDS Delivery',
      theme: FdsTheme.brandB,
      debugShowCheckedModeBanner: false,
      home: DeliveryShell(onSwitchBrand: onSwitchBrand),
    );
  }
}

class DeliveryShell extends StatefulWidget {
  const DeliveryShell({super.key, required this.onSwitchBrand});
  final VoidCallback onSwitchBrand;

  @override
  State<DeliveryShell> createState() => _DeliveryShellState();
}

class _DeliveryShellState extends State<DeliveryShell> {
  int _tab = 0;

  @override
  Widget build(BuildContext context) {
    final screens = [
      const DeliveryHomeScreen(),
      const RouteScreen(),
      const PackagesScreen(),
      DeliveryProfileScreen(onSwitchBrand: widget.onSwitchBrand),
    ];

    return Scaffold(
      body: screens[_tab],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _tab,
        onTap: (i) => setState(() => _tab = i),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined), activeIcon: Icon(Icons.home), label: 'Inicio'),
          BottomNavigationBarItem(icon: Icon(Icons.route_outlined), activeIcon: Icon(Icons.route), label: 'Ruta'),
          BottomNavigationBarItem(icon: Icon(Icons.inventory_2_outlined), activeIcon: Icon(Icons.inventory_2), label: 'Paquetes'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), activeIcon: Icon(Icons.person), label: 'Perfil'),
        ],
      ),
    );
  }
}
