#!/usr/bin/env ruby
# vim: set ts=2 sw=2 expandtab:

require 'xmpp4r'
require 'xmpp4r/roster'

Jabber::debug = true

### client
id = Jabber::JID.new('XYZ@jappix.com')
c = Jabber::Client.new id
puts "LOG --- about to connect...\n"
c.connect
puts "LOG --- about to auth...\n"
c.auth('PASSWORD')
puts "LOG --- about to presence...\n"
c.send(Jabber::Presence.new(:chat, 'Yeh', 0))

c.add_message_callback do |mm|
  puts mm.to_s
end

### roster
r = Jabber::Roster::Helper.new(c)

r.add_subscription_request_callback do |item, pres|
  r.accept_subscription(pres.from)
  c.send(Jabber::Presence.new.set_type(:subscription).set_to(pres.from))
  c.send(Jabber::Message::new(pres.from, 'Welcome!'))
end

to = Jabber::JID.new 'sio4@jappix.com'

puts "\n"
puts "Starting Chat Loop...\n"
while true
  print "usage: cmd arg\n"
  print "   status: xa away dnd chat nil\n"
  print "Quit/Loop/Message/Status/suBscribe > "
  STDOUT.flush
  str = gets.chomp
  cmd = str.sub(/ .*/,'')
  arg = str.sub(/^[a-z]* /,'')

  puts "#{str} -- cmd: #{cmd}, arg: #{arg}"

  case cmd
  when 'q'
    break
  when 'l'
    puts "message for #{arg}"
    m = arg.sub(/^[a-z]* /,'')
    t = arg.sub(/ .*/,'').to_i
    t.times do |i|
      c.send(Jabber::Message::new(to, arg))
      sleep(10)
    end
  when 'm'
    puts "message for #{arg}"
    c.send(Jabber::Message::new(to, arg))
  when 's'
    puts "status for #{arg}"
    case arg
    when 'xa'
      c.send(Jabber::Presence.new(:xa, 'Yeh', 100))
    when 'away'
      c.send(Jabber::Presence.new(:away, 'Yeh', 100))
    when 'dnd'
      c.send(Jabber::Presence.new(:dnd, 'Yeh', 100))
    when 'chat'
      c.send(Jabber::Presence.new(:chat, 'Yeh', 100))
    when 'nil'
      c.send(Jabber::Presence.new(nil, 'Yeh', 100))
    end
  when 'b'
    puts "subscribe #{arg}"
    c.send(Jabber::Presence.new.set_type(:subscribe).set_to(arg))
  when 'u'
    puts "unsubscribe #{arg}"
    c.send(Jabber::Presence.new.set_type(:unsubscribe).set_to(arg))
  else
    puts "unknown command."
  end

end
