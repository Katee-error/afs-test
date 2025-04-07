
export function formatPhoneNumber(phone: string): string {

    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length === 10) {
      const areaCode = cleaned.substring(0, 3);
      const centralOffice = cleaned.substring(3, 6);
      const lineNumber = cleaned.substring(6, 10);
      return `+1 ${areaCode} ${centralOffice} ${lineNumber}`;
    }

    else if (cleaned.length === 11 && cleaned.startsWith("1")) {
      const areaCode = cleaned.substring(1, 4);
      const centralOffice = cleaned.substring(4, 7);
      const lineNumber = cleaned.substring(7, 11);
      return `+1 ${areaCode} ${centralOffice} ${lineNumber}`;
    }
    return phone;
  }
  