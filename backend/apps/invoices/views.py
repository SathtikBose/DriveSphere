import io
from django.http import HttpResponse, Http404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from apps.orders.models import Order

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_invoice(request, order_id):
    try:
        order = Order.objects.get(id=order_id, buyer=request.user)
    except Order.DoesNotExist:
        raise Http404("Order not found or access denied")

    # Create the HttpResponse object with the appropriate PDF headers.
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="Invoice_DriveSphere_{order.id}.pdf"'

    buffer = io.BytesIO()

    # Create the PDF object, using the buffer as its "file."
    p = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    # Draw things on the PDF
    
    # Header
    p.setFillColor(HexColor('#00E5FF'))
    p.setFont("Helvetica-Bold", 24)
    p.drawString(50, height - 50, "DriveSphere")
    
    p.setFillColor(HexColor('#333333'))
    p.setFont("Helvetica", 14)
    p.drawString(50, height - 75, "Vehicle Purchase Invoice")
    
    # Invoice Details
    p.setFont("Helvetica", 12)
    p.drawString(50, height - 120, f"Invoice Number: {order.id}")
    p.drawString(50, height - 140, f"Date: {order.created_at.strftime('%Y-%m-%d %H:%M')}")
    p.drawString(50, height - 160, f"Status: {order.status}")
    
    # Buyer Info
    p.setFont("Helvetica-Bold", 12)
    p.drawString(50, height - 200, "Billed To:")
    p.setFont("Helvetica", 12)
    p.drawString(50, height - 220, f"{order.buyer.first_name} {order.buyer.last_name}")
    p.drawString(50, height - 240, f"{order.buyer.email}")

    # Divider
    p.line(50, height - 270, width - 50, height - 270)
    
    # Item details
    p.setFont("Helvetica-Bold", 12)
    p.drawString(50, height - 300, "Description")
    p.drawString(width - 150, height - 300, "Amount")
    
    p.setFont("Helvetica", 12)
    car_desc = f"{order.car.year} {order.car.brand} {order.car.model}"
    p.drawString(50, height - 330, car_desc)
    
    amount_str = f"${float(order.amount):,.2f}"
    p.drawString(width - 150, height - 330, amount_str)
    
    # Divider
    p.line(50, height - 360, width - 50, height - 360)
    
    # Total
    p.setFont("Helvetica-Bold", 14)
    p.drawString(width - 250, height - 400, "Total:")
    p.drawString(width - 150, height - 400, amount_str)

    # Footer
    p.setFont("Helvetica-Oblique", 10)
    p.setFillColor(HexColor('#777777'))
    p.drawString(50, 50, "Thank you for your purchase via DriveSphere Marketplace.")

    # Close the PDF object cleanly
    p.showPage()
    p.save()

    # Get the value of the BytesIO buffer and write it to the response.
    pdf = buffer.getvalue()
    buffer.close()
    response.write(pdf)

    return response
