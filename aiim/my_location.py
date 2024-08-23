import geocoder
def your_location():
    g = geocoder.ip('me')
    latitude, longitude = g.latlng
    return latitude, longitude

if __name__=='__main__':
    print(your_location())