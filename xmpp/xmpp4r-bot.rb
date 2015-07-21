#!/usr/bin/env ruby
# vim: set ts=2 sw=2 expandtab:

require 'xmpp4r'
require 'xmpp4r/roster'

class Pabalma
  include Jabber
  attr_accessor :jid, :password
  attr_reader :client, :roster

  def initialize
    self.jid = ARGV[0]
    self.password = ARGV[1]
    @client = Client.new(self.jid)
    Jabber::debug = true
    connect
  end

  def connect
    @client.connect
    @client.auth(@password)
    @client.send(Presence.new.set_type(:available))

    @roster = Roster::Helper.new(@client)

    start_subscription_callback
    start_message_callback
  end

  def start_message_callback
    @client.add_message_callback do |m|
      @starling.set('backend',
                    {:from => m.from, :body => m.body}.to_json) unless m.composing? || m.body.to_s.strip == ""
    end
  end

  def start_subscription_callback
    @roster.add_subscription_request_callback do |item,pres|
      @roster.accept_subscription(pres.from)
      x = Presence.new.set_type(:subscribe).set_to(pres.from)
      @client.send(x)
      
      m=Message::new
      m.to = pres.from
      m.body = "Welcome! Type a location to get the weather forecast"
      @client.send(m)
    end
  end

end

Pabalma.new
Thread.stop

